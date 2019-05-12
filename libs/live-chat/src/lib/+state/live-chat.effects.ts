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
  UpdateMessages
} from './live-chat.actions';

import { AuthFacade, IUserId } from '@nx-angular-resume/auth';
import { map } from 'rxjs/operators';
import { LiveChatService } from '../live-chat.service';

@Injectable()
export class LiveChatEffects {
  @Effect() connectToStream$ = this.dataPersistence.fetch(
    LiveChatActionTypes.ConnectLiveChat,
    {
      run: (action: ConnectLiveChat, state: LiveChatPartialState) => {
        return this.livechatService
          .connnetToStream(action.userId, action.destinationId)
          .pipe(map(messages => new UpdateMessages(messages)));
      },
      onError: (action: ConnectLiveChat, error) => {
        return new LiveChatConnectError(error);
      }
    }
  );

  @Effect() createNewCollections = this.dataPersistence.pessimisticUpdate(
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

  @Effect() SendMessage$ = this.dataPersistence.optimisticUpdate(
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
        console.dir(error);
        if (error.code === 'permission-denied')
          return new NotFoundCollectionsError(action.message);
        return new SendMessageError(action.message);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private livechatService: LiveChatService,
    private authFacade: AuthFacade,
    private dataPersistence: DataPersistence<LiveChatPartialState>
  ) {}
}
