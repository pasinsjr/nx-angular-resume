import { LiveChatAction, LiveChatActionTypes } from './live-chat.actions';
import { UnsendedMessage, Message } from '../live-chat.public-classes';
import { UserId } from '@nx-angular-resume/user';
import { Observable, of } from 'rxjs';

export const LIVECHAT_FEATURE_KEY = 'liveChat';

/**
 * Interface for the 'LiveChat' data used in
 *  - LiveChatState, and
 *  - liveChatReducer
 *
 *  Note: replace if already defined in another module
 */

export interface LiveChatState {
  messages: Observable<Message[]>;
  unsendedMessages: UnsendedMessage[];
  errorMessages: UnsendedMessage[];
  userId: UserId;
  requestToMessageUsers: UserId[];
  destinationId: UserId;
  connected: boolean;
  error?: any;
}

export interface LiveChatPartialState {
  readonly [LIVECHAT_FEATURE_KEY]: LiveChatState;
}

export const initialState: LiveChatState = {
  messages: null,
  unsendedMessages: [],
  errorMessages: [],
  requestToMessageUsers: [],
  userId: null,
  destinationId: null,
  connected: false
};

export function liveChatReducer(
  state: LiveChatState = initialState,
  action: LiveChatAction
): LiveChatState {
  switch (action.type) {
    case LiveChatActionTypes.ConnectLiveChat: {
      state = {
        ...state,
        connected: false,
        userId: action.userId,
        destinationId: action.destinationId
      };
      break;
    }
    case LiveChatActionTypes.UpdateMessages: {
      state = {
        ...state,
        connected: true,
        messages: action.messages
      };
      break;
    }
    case LiveChatActionTypes.AlreadySendMessage: {
      state = {
        ...state,
        unsendedMessages: [
          ...state.unsendedMessages.filter(
            message => message.id.value !== action.message.id.value
          )
        ]
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
      break;
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
