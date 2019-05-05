import { Entity, ProfileState } from './profile.reducer';
import { profileQuery } from './profile.selectors';

describe('Profile Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProfileId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createProfile = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      profile: {
        list: [
          createProfile('PRODUCT-AAA'),
          createProfile('PRODUCT-BBB'),
          createProfile('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Profile Selectors', () => {
    it('getAllProfile() should return the list of Profile', () => {
      const results = profileQuery.getAllProfile(storeState);
      const selId = getProfileId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedProfile() should return the selected Entity', () => {
      const result = profileQuery.getSelectedProfile(storeState);
      const selId = getProfileId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = profileQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = profileQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
