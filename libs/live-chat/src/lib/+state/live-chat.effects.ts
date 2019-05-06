import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { LiveChatPartialState } from './live-chat.reducer';
import {
  LoadLiveChat,
  LiveChatLoaded,
  LiveChatLoadError,
  LiveChatActionTypes
} from './live-chat.actions';

@Injectable()
export class LiveChatEffects {
  @Effect() loadLiveChat$ = this.dataPersistence.fetch(
    LiveChatActionTypes.LoadLiveChat,
    {
      run: (action: LoadLiveChat, state: LiveChatPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new LiveChatLoaded([]);
      },

      onError: (action: LoadLiveChat, error) => {
        console.error('Error', error);
        return new LiveChatLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<LiveChatPartialState>
  ) {}
}
