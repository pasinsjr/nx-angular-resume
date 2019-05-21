import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

const getLoaded = createSelector(
  getAuthState,
  (state: AuthState) => state.loaded
);
const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

const getUser = createSelector(
  getAuthState,
  (state: AuthState) => state.user
);

const getAllAuth = createSelector(
  getAuthState,
  getLoaded,
  (state: AuthState, isLoaded) => {
    return isLoaded ? state.user : null;
  }
);

export const authQuery = {
  getLoaded,
  getError,
  getUser,
  getAllAuth
};
