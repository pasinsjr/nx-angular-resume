import { Action } from '@ngrx/store';
import { Message, UnsendedMessage } from '../live-chat.public-classes';
import { IUserId, IUser } from '@nx-angular-resume/auth';

export enum LiveChatActionTypes {
  LoadLiveChat = '[LiveChat] Load LiveChat',
  ConnectLiveChat = '[LiveChat] Connect LiveChat',
  SendMessage = '[LiveChat] Send Message',
  AlreadySendMessage = '[LiveChat] Already Send Message',
  ResendMessage = '[LiveChat] Resend Message',
  SendMessageError = '[LiveChat] Send Message Error',
  UpdateMessages = '[LiveChat] Update Messages',
  LiveChatLoaded = '[LiveChat] LiveChat Loaded',
  NotFoundCollectionsError = '[LiveChat] Not found collections error',
  LiveChatConnectError = '[LiveChat] LiveChat Load Error'
}

export class LoadLiveChat implements Action {
  readonly type = LiveChatActionTypes.LoadLiveChat;
}

export class ConnectLiveChat implements Action {
  readonly type = LiveChatActionTypes.ConnectLiveChat;
  constructor(public userId: IUserId, public destinationId: IUserId) {}
}

export class UpdateMessages implements Action {
  readonly type = LiveChatActionTypes.UpdateMessages;
  constructor(public messages: Message[]) {}
}

export class SendMessage implements Action {
  readonly type = LiveChatActionTypes.SendMessage;
  constructor(public message: UnsendedMessage) {}
}

export class ResendMessage implements Action {
  readonly type = LiveChatActionTypes.ResendMessage;
  constructor(public message: UnsendedMessage) {}
}

export class AlreadySendMessage implements Action {
  readonly type = LiveChatActionTypes.AlreadySendMessage;
  constructor(public message: UnsendedMessage) {}
}

export class SendMessageError implements Action {
  readonly type = LiveChatActionTypes.SendMessageError;
  constructor(public message: UnsendedMessage) {}
}

export class LiveChatConnectError implements Action {
  readonly type = LiveChatActionTypes.LiveChatConnectError;
  constructor(public payload: any) {}
}

export class NotFoundCollectionsError implements Action {
  readonly type = LiveChatActionTypes.NotFoundCollectionsError;
  constructor(public message: UnsendedMessage) {}
}

export class LiveChatLoaded implements Action {
  readonly type = LiveChatActionTypes.LiveChatLoaded;
  constructor(public payload: Message[]) {}
}

export type LiveChatAction =
  | LoadLiveChat
  | ConnectLiveChat
  | SendMessage
  | ResendMessage
  | AlreadySendMessage
  | UpdateMessages
  | SendMessageError
  | LiveChatLoaded
  | LiveChatConnectError
  | NotFoundCollectionsError;

export type LiveChateError =
  | LiveChatConnectError
  | NotFoundCollectionsError
  | SendMessageError;

export const fromLiveChatActions = {
  LoadLiveChat,
  ConnectLiveChat,
  SendMessage,
  AlreadySendMessage,
  UpdateMessages,
  SendMessageError,
  LiveChatLoaded,
  LiveChatConnectError,
  NotFoundCollectionsError
};
