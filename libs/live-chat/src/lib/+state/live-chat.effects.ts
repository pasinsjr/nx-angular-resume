import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { LiveChatPartialState } from './live-chat.reducer';
import {
  LiveChatConnectError,
  LiveChatActionTypes,
  ConnectLiveChat,
  UpdateMessage,
  NotFoundCollectionsError,
  SendMessage,
  SendMessageError,
  AlreadySendMessage
} from './live-chat.actions';

import { AngularFirestore } from '@angular/fire/firestore';
import { AuthFacade } from '@nx-angular-resume/auth';
import { switchMap, map, filter, take } from 'rxjs/operators';
import { from } from 'rxjs';
import { Message } from '../live-chat.public-classes';

@Injectable()
export class LiveChatEffects {
  @Effect() connectToStream$ = this.dataPersistence.fetch(
    LiveChatActionTypes.ConnectLiveChat,
    {
      run: (action: ConnectLiveChat, state: LiveChatPartialState) => {
        return this.authFacade.user$.pipe(
          filter(user => (user ? true : false)),
          switchMap(user =>
            this.afs
              .collection<Message>(`messages/${user.uid}/messages`)
              .valueChanges()
              .pipe(map(messages => new UpdateMessage(messages)))
          )
        );
      },
      onError: (action: ConnectLiveChat, error) => {
        console.error('Error', error);
        if (error.code === 'invalid-argument')
          return new NotFoundCollectionsError(error);
        return new LiveChatConnectError(error);
      }
    }
  );

  @Effect() createNewCollections = this.dataPersistence.pessimisticUpdate(
    LiveChatActionTypes.NotFoundCollectionsError,
    {
      run: (action: NotFoundCollectionsError, state: LiveChatPartialState) => {
        return this.authFacade.user$.pipe(
          filter(user => (user ? true : false)),
          take(1),
          switchMap(user =>
            from(
              this.afs
                .collection<Message>('messages')
                .doc(user.uid.value)
                .set({ messages: [] })
            ).pipe(
              take(1),
              map(result => new ConnectLiveChat())
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
        return this.authFacade.user$.pipe(
          filter(user => (user ? true : false)),
          switchMap(user =>
            from(
              this.afs
                .collection<Message>(`messages/${user.uid}/messages`)
                .add({ ...action.message, timeStamp: new Date() })
            ).pipe(map(response => new AlreadySendMessage(action.message)))
          )
        );
      },
      undoAction: (action: SendMessage, error) => {
        console.error('Error', error);
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
