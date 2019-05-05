import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROFILE_FEATURE_KEY, ProfileState } from './profile.reducer';

// Lookup the 'Profile' feature state managed by NgRx
const getProfileState = createFeatureSelector<ProfileState>(
  PROFILE_FEATURE_KEY
);

const getLoaded = createSelector(
  getProfileState,
  (state: ProfileState) => state.loaded
);
const getError = createSelector(
  getProfileState,
  (state: ProfileState) => state.error
);

const getAllProfile = createSelector(
  getProfileState,
  getLoaded,
  (state: ProfileState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getProfileState,
  (state: ProfileState) => state.selectedId
);
const getSelectedProfile = createSelector(
  getAllProfile,
  getSelectedId,
  (profile, id) => {
    const result = profile.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const profileQuery = {
  getLoaded,
  getError,
  getAllProfile,
  getSelectedProfile
};
