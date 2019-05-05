import { ProfileLoaded } from './profile.actions';
import {
  ProfileState,
  Entity,
  initialState,
  profileReducer
} from './profile.reducer';

describe('Profile Reducer', () => {
  const getProfileId = it => it['id'];
  let createProfile;

  beforeEach(() => {
    createProfile = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Profile actions ', () => {
    it('should return set the list of known Profile', () => {
      const profiles = [
        createProfile('PRODUCT-AAA'),
        createProfile('PRODUCT-zzz')
      ];
      const action = new ProfileLoaded(profiles);
      const result: ProfileState = profileReducer(initialState, action);
      const selId: string = getProfileId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = profileReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
