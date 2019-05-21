import { AuthAction, AuthActionTypes } from './auth.actions';
import { IUser } from '../auth.public-classes';

export const AUTH_FEATURE_KEY = 'auth';

/**
 * Interface for the 'Auth' data used in
 *  - AuthState, and
 *  - authReducer
 *
 *  Note: replace if already defined in another module
 */
export interface AuthState {
  user: IUser; // list of Auth; analogous to a sql normalized table
  selectedId?: string | number; // which Auth record has been selected
  loaded: boolean; // has the Auth list been loaded
  error?: any; // last none error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  user: null,
  loaded: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.AuthLoaded: {
      state = {
        ...state,
        user: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
