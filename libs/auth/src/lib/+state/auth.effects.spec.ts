import { TestBed, async } from '@angular/core/testing';

import { Observable, of, BehaviorSubject } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { AuthEffects } from './auth.effects';
import { LoadAuth, AuthLoaded } from './auth.actions';
import {
  GoogleAnonymousUser,
  IUserId,
  GoogleUser
} from '../auth.public-classes';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { StringURL } from '@nx-angular-resume/common-classes';

describe('AuthEffects', () => {
  let actions: Observable<any>;
  let effects: AuthEffects;

  const mockAnonymousUser = {
    uid: 'AAAAAA',
    isAnonymous: true
  };

  const mockGoogleUser = {
    uid: 'BBBBBB',
    isAnonymous: false,
    displayName: 'test test',
    photoURL: 'https://google.com/test.png'
  };

  const mockAngularFireState: BehaviorSubject<any> = new BehaviorSubject(null);

  let mockAngularFireAuth = {
    authState: mockAngularFireState.asObservable(),
    auth: {
      signInAnonymously: jest.fn(),
      signInWithPopup: jest.fn()
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        AuthEffects,
        DataPersistence,
        {
          provide: AngularFireAuth,
          useValue: mockAngularFireAuth
        },
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(AuthEffects);
  });

  describe('loadAuth$ with Anonymous', () => {
    it('should work', () => {
      mockAngularFireState.next(mockAnonymousUser);
      actions = hot('-a-', { a: new LoadAuth() });
      expect(effects.loadAuth$).toBeObservable(
        hot('-a-', {
          a: new AuthLoaded(new GoogleAnonymousUser(IUserId.create('AAAAAA')))
        })
      );
    });
  });

  describe('loadAuth$ with Google User', () => {
    it('should work', () => {
      mockAngularFireState.next(mockGoogleUser);
      actions = hot('-a-', { a: new LoadAuth() });
      expect(effects.loadAuth$).toBeObservable(
        hot('-a-', {
          a: new AuthLoaded(
            new GoogleUser(
              IUserId.create('BBBBBB'),
              'test test',
              StringURL.create('https://google.com/test.png')
            )
          )
        })
      );
    });
  });
});
