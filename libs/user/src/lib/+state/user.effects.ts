import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { UserPartialState } from './user.reducer';
import {
  LoadUser,
  UserLoaded,
  UserLoadError,
  UserActionTypes,
  UpdateUser,
  UpdateUserError,
  UpdatedUser
} from './user.actions';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  @Effect() loadUser$ = this.dataPersistence.fetch(UserActionTypes.LoadUser, {
    run: (action: LoadUser, state: UserPartialState) => {
      return this.userService
        .connectUserStorage()
        .pipe(map(users => new UserLoaded(users)));
    },

    onError: (action: LoadUser, error) => {
      console.error('Error', error);
      return new UserLoadError(error);
    }
  });

  @Effect() updateUser$ = this.dataPersistence.pessimisticUpdate(
    UserActionTypes.UpdateUser,
    {
      run: (action: UpdateUser, state: UserPartialState) => {
        this.userService
          .updateUser(action.user)
          .pipe(map(response => new UpdatedUser()));
      },
      onError: (action: UpdateUser, error) => {
        console.error('Error', error);
        return new UpdateUserError();
      }
    }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private dataPersistence: DataPersistence<UserPartialState>
  ) {}
}
