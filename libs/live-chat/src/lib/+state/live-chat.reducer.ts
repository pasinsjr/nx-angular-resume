import { LiveChatAction, LiveChatActionTypes } from './live-chat.actions';
import { String150 } from '@nx-angular-resume/common-classes';
import { UnsendedMessage, Message } from '../live-chat.public-classes';
import { IUserId } from '@nx-angular-resume/auth';

export const LIVECHAT_FEATURE_KEY = 'liveChat';

/**
 * Interface for the 'LiveChat' data used in
 *  - LiveChatState, and
 *  - liveChatReducer
 *
 *  Note: replace if already defined in another module
 */

export interface LiveChatState {
  messages: Message[];
  unsendedMessages: UnsendedMessage[];
  errorMessages: UnsendedMessage[];
  userId: IUserId;
  destinationId: IUserId;
  loaded: boolean;
  error?: any;
}

export interface LiveChatPartialState {
  readonly [LIVECHAT_FEATURE_KEY]: LiveChatState;
}

export const initialState: LiveChatState = {
  messages: [],
  unsendedMessages: [],
  errorMessages: [],
  userId: null,
  destinationId: null,
  loaded: false
};

export function liveChatReducer(
  state: LiveChatState = initialState,
  action: LiveChatAction
): LiveChatState {
  switch (action.type) {
    case LiveChatActionTypes.ConnectLiveChat: {
      state = {
        ...state,
        userId: action.userId,
        destinationId: action.destinationId
      };
      break;
    }
    case LiveChatActionTypes.UpdateMessages: {
      state = {
        ...state,
        messages: action.messages
      };
      break;
    }

    case LiveChatActionTypes.SendMessage: {
      state = {
        ...state,
        unsendedMessages: [...state.unsendedMessages, action.message]
      };
      break;
    }

    case LiveChatActionTypes.SendMessageError: {
      state = {
        ...state,
        unsendedMessages: state.unsendedMessages.filter(
          message => message.id !== action.message.id
        ),
        errorMessages: [...state.errorMessages, action.message]
      };
    }

    case LiveChatActionTypes.ResendMessage: {
      state = {
        ...state,
        unsendedMessages: [...state.unsendedMessages, action.message],
        errorMessages: state.errorMessages.filter(
          message => message.id !== action.message.id
        )
      };
      break;
    }
  }
  return state;
}
