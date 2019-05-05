import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { ProfileEffects } from './profile.effects';
import { LoadProfile, ProfileLoaded } from './profile.actions';

describe('ProfileEffects', () => {
  let actions: Observable<any>;
  let effects: ProfileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        ProfileEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(ProfileEffects);
  });

  describe('loadProfile$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadProfile() });
      expect(effects.loadProfile$).toBeObservable(
        hot('-a-|', { a: new ProfileLoaded([]) })
      );
    });
  });
});
