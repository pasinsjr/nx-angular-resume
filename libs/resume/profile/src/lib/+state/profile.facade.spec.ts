import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { ProfileEffects } from './profile.effects';
import { ProfileFacade } from './profile.facade';

import { profileQuery } from './profile.selectors';
import { LoadProfile, ProfileLoaded } from './profile.actions';
import {
  ProfileState,
  Entity,
  initialState,
  profileReducer
} from './profile.reducer';

interface TestSchema {
  profile: ProfileState;
}

describe('ProfileFacade', () => {
  let facade: ProfileFacade;
  let store: Store<TestSchema>;
  let createProfile;

  beforeEach(() => {
    createProfile = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('profile', profileReducer, { initialState }),
          EffectsModule.forFeature([ProfileEffects])
        ],
        providers: [ProfileFacade]
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
      facade = TestBed.get(ProfileFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allProfile$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allProfile$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `ProfileLoaded` to manually submit list for state management
     */
    it('allProfile$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allProfile$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new ProfileLoaded([createProfile('AAA'), createProfile('BBB')])
        );

        list = await readFirst(facade.allProfile$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
