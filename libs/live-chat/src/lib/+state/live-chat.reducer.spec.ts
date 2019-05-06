import { LiveChatLoaded } from './live-chat.actions';
import {
  LiveChatState,
  Entity,
  initialState,
  liveChatReducer
} from './live-chat.reducer';

describe('LiveChat Reducer', () => {
  const getLiveChatId = it => it['id'];
  let createLiveChat;

  beforeEach(() => {
    createLiveChat = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid LiveChat actions ', () => {
    it('should return set the list of known LiveChat', () => {
      const liveChats = [
        createLiveChat('PRODUCT-AAA'),
        createLiveChat('PRODUCT-zzz')
      ];
      const action = new LiveChatLoaded(liveChats);
      const result: LiveChatState = liveChatReducer(initialState, action);
      const selId: string = getLiveChatId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = liveChatReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
