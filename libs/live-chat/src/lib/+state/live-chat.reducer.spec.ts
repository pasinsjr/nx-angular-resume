import {
  ConnectLiveChat,
  UpdateMessages,
  AlreadySendMessage
} from './live-chat.actions';
import {
  LiveChatState,
  initialState,
  liveChatReducer
} from './live-chat.reducer';
import { UserId } from '@nx-angular-resume/user';
import { of } from 'rxjs';
import {
  UnsendedMessage,
  UnsendedMessageId
} from '../live-chat.public-classes';
import { String150 } from '@nx-angular-resume/common-classes';

describe('LiveChat Reducer', () => {
  let mockUserIdA: UserId;
  let mockUserIdB: UserId;

  beforeEach(() => {
    mockUserIdA = UserId.create('a');
    mockUserIdB = UserId.create('b');
  });

  describe('ConnectLiveChat action', () => {
    it('should updating live chat connect state', () => {
      const action = new ConnectLiveChat(mockUserIdA, mockUserIdB);
      const result: LiveChatState = liveChatReducer(initialState, action);

      expect(result.userId).toBe(mockUserIdA);
      expect(result.destinationId).toBe(mockUserIdB);
      expect(result.connected).toBe(false);
    });
  });

  describe('UpdateMessages action', () => {
    it('should updating messages', () => {
      const messages$ = of([]);
      const action = new UpdateMessages(messages$);
      const result = liveChatReducer(initialState, action);

      expect(result.messages).toBe(messages$);
      expect(result.connected).toBe(true);
    });
  });

  describe('AlreadySendMessage action', () => {
    it('should updating unsend messages', () => {
      const unsendMessage = {
        id: UnsendedMessageId.create(),
        destination: mockUserIdB,
        description: String150.create('test')
      } as UnsendedMessage;

      const action = new AlreadySendMessage(unsendMessage);
      const result = liveChatReducer(
        { ...initialState, unsendedMessages: [unsendMessage] },
        action
      );

      expect(result.unsendedMessages.length).toBe(0);
    });
  });
});
