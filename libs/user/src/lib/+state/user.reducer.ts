import { UserAction, UserActionTypes } from './user.actions';
import { User } from '../user.public-classes';

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
  users: { [key: string]: User };
  allUsers: User[];
  loaded: boolean; // has the User list been loaded
  error?: any; // last none error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialState: UserState = {
  users: {},
  allUsers: [],
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
        allUsers: action.allusers,
        users: action.usersObject,
        loaded: true
      };
      break;
    }
  }
  return state;
}
