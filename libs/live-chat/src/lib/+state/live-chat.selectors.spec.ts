import { LiveChatState } from './live-chat.reducer';
import { liveChatQuery } from './live-chat.selectors';
import { of } from 'rxjs';
import { UserId } from '@nx-angular-resume/user';
import { UnsendedMessage } from '../live-chat.public-classes';

describe('LiveChat Selectors', () => {
  const ERROR_MSG = 'No Error Available';

  let storeState;

  const mockUserIdA = UserId.create('a');
  const mockUserIdB = UserId.create('b');
  const mockMessage$ = of([]);
  const mockUnsendedMessages = [{} as UnsendedMessage];
  const mockErrorMessages = [{} as UnsendedMessage];

  beforeEach(() => {
    storeState = {
      liveChat: {
        messages: mockMessage$,
        unsendedMessages: mockUnsendedMessages,
        errorMessages: mockErrorMessages,
        userId: mockUserIdA,
        destinationId: mockUserIdB,
        connected: true
      }
    };
  });

  describe('LiveChat Selectors', () => {
    it('getConnected() should return true', () => {
      const results = liveChatQuery.getConnected(storeState);

      expect(results).toBe(true);
    });

    it('getMessages() should return current observable of message', () => {
      const result = liveChatQuery.getMessages(storeState);

      expect(result).toBe(mockMessage$);
    });

    it('getUnsendMessages() should return the current unsend message list', () => {
      const result = liveChatQuery.getUnsendedMessages(storeState);

      expect(result).toBe(mockUnsendedMessages);
    });

    it('getErrorMessages() should return the current error message list', () => {
      const result = liveChatQuery.getErorrMessages(storeState);

      expect(result).toBe(mockErrorMessages);
    });
  });
});
