import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { LiveChatPartialState, Message } from './live-chat.reducer';
import {
  LoadLiveChat,
  LiveChatLoaded,
  LiveChatConnectError,
  LiveChatActionTypes,
  ConnectLiveChat,
  UpdateMessage
} from './live-chat.actions';

import { AngularFirestore } from '@angular/fire/firestore';
import { IUser, AuthFacade } from '@nx-angular-resume/auth';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class LiveChatEffects {
  @Effect() connectToStream$ = this.dataPersistence.fetch(
    LiveChatActionTypes.ConnectLiveChat,
    {
      run: (action: ConnectLiveChat, state: LiveChatPartialState) => {
        return this.authFacade.user$.pipe(
          switchMap(user =>
            this.afs
              .collection<Message>(`messages/${user.uid}`)
              .valueChanges()
              .pipe(map(messages => new UpdateMessage(messages)))
          )
        );
      },
      onError: (action: ConnectLiveChat, error) => {
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
