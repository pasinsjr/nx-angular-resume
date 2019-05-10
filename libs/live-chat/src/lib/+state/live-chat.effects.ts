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

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthFacade, IUserId } from '@nx-angular-resume/auth';
import { switchMap, map, filter, take, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { String150 } from '@nx-angular-resume/common-classes';
import { Message } from '../live-chat.public-classes';

interface CommonTypeMessage {
  timeStamp: Date;
  destination: string;
  description: string;
}

const messageToCommon = (message: Message) => ({
  ...message,
  destination: message.destination.value,
  description: message.description.value
});

const commonToMessage = (message: CommonTypeMessage) => ({
  ...message,
  destination: IUserId.create(message.destination),
  description: String150.create(message.description)
});

const commonToMessageAdapter = (messages: CommonTypeMessage[]) =>
  messages.map(commonToMessage);

const messageToCommonAdapter = (messages: Message[]) =>
  messages.map(messageToCommon);

@Injectable()
export class LiveChatEffects {
  @Effect() connectToStream$ = this.dataPersistence.fetch(
    LiveChatActionTypes.ConnectLiveChat,
    {
      run: (action: ConnectLiveChat, state: LiveChatPartialState) => {
        return this.afs
          .collection<CommonTypeMessage>(
            `messages/${action.userId.value}/${action.destinationId.value}`
          )
          .valueChanges()
          .pipe(
            map(commonToMessageAdapter),
            map(
              messages =>
                new UpdateMessages(
                  messages.sort((cur, next) =>
                    cur.timeStamp > next.timeStamp ? 1 : -1
                  )
                )
            )
          );
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
        return from(
          this.afs
            .doc(`messages/${state[LIVECHAT_FEATURE_KEY].userId.value}`)
            .collection(state[LIVECHAT_FEATURE_KEY].destinationId.value)
            .add({
              timeStamp: new Date(),
              description: action.message.description.value,
              destination: action.message.destination.value
            })
        ).pipe(
          take(1),
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
        return from(
          this.afs
            .collection<CommonTypeMessage>(
              `messages/${state[LIVECHAT_FEATURE_KEY].userId.value}/${
                state[LIVECHAT_FEATURE_KEY].destinationId.value
              }`
            )
            .add({
              timeStamp: new Date(),
              description: action.message.description.value,
              destination: action.message.destination.value
            })
        ).pipe(map(response => new AlreadySendMessage(action.message)));
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
    private afs: AngularFirestore,
    private authFacade: AuthFacade,
    private dataPersistence: DataPersistence<LiveChatPartialState>
  ) {}
}
