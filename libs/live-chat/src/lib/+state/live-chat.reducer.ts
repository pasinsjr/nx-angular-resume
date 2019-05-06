import { LiveChatAction, LiveChatActionTypes } from './live-chat.actions';

export const LIVECHAT_FEATURE_KEY = 'liveChat';

/**
 * Interface for the 'LiveChat' data used in
 *  - LiveChatState, and
 *  - liveChatReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface LiveChatState {
  list: Entity[]; // list of LiveChat; analogous to a sql normalized table
  selectedId?: string | number; // which LiveChat record has been selected
  loaded: boolean; // has the LiveChat list been loaded
  error?: any; // last none error (if any)
}

export interface LiveChatPartialState {
  readonly [LIVECHAT_FEATURE_KEY]: LiveChatState;
}

export const initialState: LiveChatState = {
  list: [],
  loaded: false
};

export function liveChatReducer(
  state: LiveChatState = initialState,
  action: LiveChatAction
): LiveChatState {
  switch (action.type) {
    case LiveChatActionTypes.LiveChatLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
