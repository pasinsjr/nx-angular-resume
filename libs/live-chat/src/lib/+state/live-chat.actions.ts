import { Action } from '@ngrx/store';
import { Message } from './live-chat.reducer';

export enum LiveChatActionTypes {
  LoadLiveChat = '[LiveChat] Load LiveChat',
  ConnectLiveChat = '[LiveChat] Connect LiveChat',
  UpdateMessages = '[LiveChat] Update Messages',
  LiveChatLoaded = '[LiveChat] LiveChat Loaded',
  LiveChatConnectError = '[LiveChat] LiveChat Load Error'
}

export class LoadLiveChat implements Action {
  readonly type = LiveChatActionTypes.LoadLiveChat;
}

export class ConnectLiveChat implements Action {
  readonly type = LiveChatActionTypes.ConnectLiveChat;
}

export class UpdateMessage implements Action {
  readonly type = LiveChatActionTypes.UpdateMessages;
  constructor(public payload: Message[]) {}
}

export class LiveChatConnectError implements Action {
  readonly type = LiveChatActionTypes.LiveChatConnectError;
  constructor(public payload: any) {}
}

export class LiveChatLoaded implements Action {
  readonly type = LiveChatActionTypes.LiveChatLoaded;
  constructor(public payload: Message[]) {}
}

export type LiveChatAction =
  | LoadLiveChat
  | ConnectLiveChat
  | LiveChatLoaded
  | LiveChatConnectError;

export const fromLiveChatActions = {
  LoadLiveChat,
  ConnectLiveChat,
  LiveChatLoaded,
  LiveChatConnectError
};
