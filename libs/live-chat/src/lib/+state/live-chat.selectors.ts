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

const getMessages = createSelector(
  getLiveChatState,
  (state: LiveChatState) => state.messages
);

const getUnsendedMessages = createSelector(
  getLiveChatState,
  (state: LiveChatState) => state.unsendedMessages
);

const getErorrMessages = createSelector(
  getLiveChatState,
  (state: LiveChatState) => state.errorMessages
);

export const liveChatQuery = {
  getLoaded,
  getError,
  getMessages,
  getUnsendedMessages,
  getErorrMessages
};
