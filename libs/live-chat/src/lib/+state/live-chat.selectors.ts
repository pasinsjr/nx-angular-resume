import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LIVECHAT_FEATURE_KEY, LiveChatState } from './live-chat.reducer';

// Lookup the 'LiveChat' feature state managed by NgRx
const getLiveChatState = createFeatureSelector<LiveChatState>(
  LIVECHAT_FEATURE_KEY
);

const getLoaded = createSelector(
  getLiveChatState,
  (state: LiveChatState) => state.loaded
);
const getError = createSelector(
  getLiveChatState,
  (state: LiveChatState) => state.error
);

const getAllLiveChat = createSelector(
  getLiveChatState,
  getLoaded,
  (state: LiveChatState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getLiveChatState,
  (state: LiveChatState) => state.selectedId
);
const getSelectedLiveChat = createSelector(
  getAllLiveChat,
  getSelectedId,
  (liveChat, id) => {
    const result = liveChat.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const liveChatQuery = {
  getLoaded,
  getError,
  getAllLiveChat,
  getSelectedLiveChat
};
