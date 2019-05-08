import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import {
  LiveChatPartialState,
  Message,
  MessagesCollection
} from './live-chat.reducer';
import {
  LoadLiveChat,
  LiveChatLoaded,
  LiveChatConnectError,
  LiveChatActionTypes,
  ConnectLiveChat,
  UpdateMessage,
  NotFoundCollectionsError
} from './live-chat.actions';

import { AngularFirestore } from '@angular/fire/firestore';
import { IUser, AuthFacade } from '@nx-angular-resume/auth';
import { switchMap, map, filter, take } from 'rxjs/operators';
import { from } from 'rxjs';

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
              .doc<MessagesCollection>(`messages/${user.uid}`)
              .valueChanges()
              .pipe(map(response => new UpdateMessage(response.messages)))
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
                .collection<MessagesCollection>('messages')
                .doc(user.uid)
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

  @Effect() loadLiveChat$ = this.dataPersistence.fetch(
    LiveChatActionTypes.LoadLiveChat,
    {
      run: (action: LoadLiveChat, state: LiveChatPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return;

        new LiveChatLoaded([]);
      },

      onError: (action: LoadLiveChat, error) => {
        console.error('Error', error);
        return new LiveChatConnectError(error);
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
