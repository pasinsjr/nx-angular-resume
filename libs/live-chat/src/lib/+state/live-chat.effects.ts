import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import {
  LiveChatPartialState,
  LIVECHAT_FEATURE_KEY
} from './live-chat.reducer';
import {
  LiveChatConnectError,
  LiveChatActionTypes,
  ConnectLiveChat,
  NotFoundCollectionsError,
  SendMessage,
  SendMessageError,
  AlreadySendMessage,
  UpdateMessages,
  PrepareToSendMessage
} from './live-chat.actions';

import { map, take } from 'rxjs/operators';
import { LiveChatService } from '../live-chat.service';
import {
  UnsendedMessage,
  UnsendedMessageId
} from '../live-chat.public-classes';
@Injectable()
export class LiveChatEffects {
  @Effect() connectToStream$ = this.dataPersistence.fetch(
    LiveChatActionTypes.ConnectLiveChat,
    {
      run: (action: ConnectLiveChat, state: LiveChatPartialState) => {
        return new UpdateMessages(
          this.livechatService.connnetToStream(
            action.userId,
            action.destinationId
          )
        );
      },
      onError: (action: ConnectLiveChat, error) => {
        return new LiveChatConnectError(error);
      }
    }
  );

  @Effect() createNewCollections$ = this.dataPersistence.pessimisticUpdate(
    LiveChatActionTypes.NotFoundCollectionsError,
    {
      run: (action: NotFoundCollectionsError, state: LiveChatPartialState) => {
        return this.livechatService
          .createNewSession(
            state[LIVECHAT_FEATURE_KEY].userId,
            state[LIVECHAT_FEATURE_KEY].destinationId,
            action.message
          )
          .pipe(
            map(
              result =>
                new ConnectLiveChat(
                  state[LIVECHAT_FEATURE_KEY].userId,
                  state[LIVECHAT_FEATURE_KEY].destinationId
                )
            )
          );
      },
      onError: (action: NotFoundCollectionsError, error) => {
        console.error('Error', error);
        return new LiveChatConnectError(error);
      }
    }
  );

  @Effect() prepareToSendMessage$ = this.dataPersistence.optimisticUpdate(
    LiveChatActionTypes.PrepareToSendMessage,
    {
      run: (action: PrepareToSendMessage, state: LiveChatPartialState) => {
        return new SendMessage({
          id: UnsendedMessageId.create(),
          description: action.message,
          destination: state[LIVECHAT_FEATURE_KEY].destinationId
        } as UnsendedMessage);
      },

      undoAction: (action: PrepareToSendMessage, error) => {
        console.error('Error', error);
        return new SendMessageError(error);
      }
    }
  );

  @Effect() sendMessage$ = this.dataPersistence.optimisticUpdate(
    LiveChatActionTypes.SendMessage,
    {
      run: (action: SendMessage, state: LiveChatPartialState) => {
        return this.livechatService
          .sendMessage(
            state[LIVECHAT_FEATURE_KEY].userId,
            state[LIVECHAT_FEATURE_KEY].destinationId,
            action.message
          )
          .pipe(map(response => new AlreadySendMessage(action.message)));
      },
      undoAction: (action: SendMessage, error) => {
        console.error('Error', error);
        if (error.code === 'permission-denied')
          return new NotFoundCollectionsError(action.message);
        return new SendMessageError(action.message);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private livechatService: LiveChatService,
    private dataPersistence: DataPersistence<LiveChatPartialState>
  ) {}
}
