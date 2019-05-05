import { ProfileAction, ProfileActionTypes } from './profile.actions';

export const PROFILE_FEATURE_KEY = 'profile';

/**
 * Interface for the 'Profile' data used in
 *  - ProfileState, and
 *  - profileReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface ProfileState {
  list: Entity[]; // list of Profile; analogous to a sql normalized table
  selectedId?: string | number; // which Profile record has been selected
  loaded: boolean; // has the Profile list been loaded
  error?: any; // last none error (if any)
}

export interface ProfilePartialState {
  readonly [PROFILE_FEATURE_KEY]: ProfileState;
}

export const initialState: ProfileState = {
  list: [],
  loaded: false
};

export function profileReducer(
  state: ProfileState = initialState,
  action: ProfileAction
): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.ProfileLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
