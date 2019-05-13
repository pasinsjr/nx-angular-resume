import { UserAction, UserActionTypes } from './user.actions';
import { IUser } from '@nx-angular-resume/auth';

export const USER_FEATURE_KEY = 'user';

/**
 * Interface for the 'User' data used in
 *  - UserState, and
 *  - userReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */

export interface UserState {
  users: { [key: string]: IUser }; // list of User; analogous to a sql normalized table
  loaded: boolean; // has the User list been loaded
  error?: any; // last none error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialState: UserState = {
  users: {},
  loaded: false
};

export function userReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case UserActionTypes.UserLoaded: {
      state = {
        ...state,
        users: action.users,
        loaded: true
      };
      break;
    }
  }
  return state;
}
