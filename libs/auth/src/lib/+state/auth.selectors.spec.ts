import { AuthState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { GoogleAnonymousUser, IUserId } from '../auth.public-classes';

describe('Auth Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const mockIUser = new GoogleAnonymousUser(IUserId.create('AAAAAA'));
  let storeState;

  beforeEach(() => {
    storeState = {
      auth: {
        user: mockIUser
      }
    };
  });

  describe('getUser Selectors', () => {
    it('getUser() should return user', () => {
      const results = authQuery.getUser(storeState);

      expect(results).toBe(mockIUser);
    });
  });
});
