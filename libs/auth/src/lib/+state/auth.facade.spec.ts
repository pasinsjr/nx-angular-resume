import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';

import { AuthState, initialState, authReducer } from './auth.reducer';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

interface TestSchema {
  auth: AuthState;
}

describe('AuthFacade', () => {
  let facade: AuthFacade;
  let store: Store<TestSchema>;
  const mockAnonymousUser = {
    uid: 'AAAAAA',
    isAnonymous: true
  };

  let mockAngularFireAuth = {
    authState: of(mockAnonymousUser),
    auth: {
      signInAnonymously: jest.fn(),
      signInWithPopup: jest.fn()
    }
  };

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('auth', authReducer, { initialState }),
          EffectsModule.forFeature([AuthEffects])
        ],
        providers: [
          AuthFacade,
          {
            provide: AngularFireAuth,
            useValue: mockAngularFireAuth
          }
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(AuthFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAuth() should return user with annonymous == true', async done => {
      try {
        let user = await readFirst(facade.user$);
        let isAnnonymous = await readFirst(facade.isAnnonymous$);

        expect(user).toBe(null);
        expect(isAnnonymous).toBe(false);

        facade.loadAuth();

        user = await readFirst(facade.user$);
        isAnnonymous = await readFirst(facade.isAnnonymous$);

        expect(user.uid.value).toBe('AAAAAA');
        expect(isAnnonymous).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
