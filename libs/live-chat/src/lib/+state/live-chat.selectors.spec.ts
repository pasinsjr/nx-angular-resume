import { Entity, LiveChatState } from './live-chat.reducer';
import { liveChatQuery } from './live-chat.selectors';

describe('LiveChat Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLiveChatId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createLiveChat = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      liveChat: {
        list: [
          createLiveChat('PRODUCT-AAA'),
          createLiveChat('PRODUCT-BBB'),
          createLiveChat('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('LiveChat Selectors', () => {
    it('getAllLiveChat() should return the list of LiveChat', () => {
      const results = liveChatQuery.getAllLiveChat(storeState);
      const selId = getLiveChatId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedLiveChat() should return the selected Entity', () => {
      const result = liveChatQuery.getSelectedLiveChat(storeState);
      const selId = getLiveChatId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = liveChatQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = liveChatQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
