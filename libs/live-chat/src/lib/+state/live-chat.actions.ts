import { Action } from '@ngrx/store';
import { message } from './live-chat.reducer';

export enum LiveChatActionTypes {
  LoadLiveChat = '[LiveChat] Load LiveChat',
  LiveChatLoaded = '[LiveChat] LiveChat Loaded',
  LiveChatLoadError = '[LiveChat] LiveChat Load Error'
}

export class LoadLiveChat implements Action {
  readonly type = LiveChatActionTypes.LoadLiveChat;
}

export class LiveChatLoadError implements Action {
  readonly type = LiveChatActionTypes.LiveChatLoadError;
  constructor(public payload: any) {}
}

export class LiveChatLoaded implements Action {
  readonly type = LiveChatActionTypes.LiveChatLoaded;
  constructor(public payload: message[]) {}
}

export type LiveChatAction = LoadLiveChat | LiveChatLoaded | LiveChatLoadError;

export const fromLiveChatActions = {
  LoadLiveChat,
  LiveChatLoaded,
  LiveChatLoadError
};
