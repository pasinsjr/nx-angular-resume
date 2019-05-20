import { AuthLoaded } from './auth.actions';
import { AuthState, initialState, authReducer } from './auth.reducer';
import { IUser, GoogleAnonymousUser, IUserId } from '../auth.public-classes';

describe('Auth Reducer', () => {
  describe('AuthLoaded action', () => {
    it('should updating user and loaded', () => {
      const mockIUser = new GoogleAnonymousUser(IUserId.create('AAAAAA'));
      const action = new AuthLoaded(mockIUser);
      const result = authReducer(initialState, action);

      expect(result.user).toBe(mockIUser);
      expect(result.loaded).toBe(true);
    });
  });
});
