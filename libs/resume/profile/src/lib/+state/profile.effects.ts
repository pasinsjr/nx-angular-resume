import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { ProfilePartialState } from './profile.reducer';
import {
  LoadProfile,
  ProfileLoaded,
  ProfileLoadError,
  ProfileActionTypes
} from './profile.actions';

@Injectable()
export class ProfileEffects {
  @Effect() loadProfile$ = this.dataPersistence.fetch(
    ProfileActionTypes.LoadProfile,
    {
      run: (action: LoadProfile, state: ProfilePartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new ProfileLoaded([]);
      },

      onError: (action: LoadProfile, error) => {
        console.error('Error', error);
        return new ProfileLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProfilePartialState>
  ) {}
}
