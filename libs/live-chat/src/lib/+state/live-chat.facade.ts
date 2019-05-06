import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { LiveChatPartialState } from './live-chat.reducer';
import { liveChatQuery } from './live-chat.selectors';
import { LoadLiveChat } from './live-chat.actions';

@Injectable()
export class LiveChatFacade {
  loaded$ = this.store.pipe(select(liveChatQuery.getLoaded));
  allLiveChat$ = this.store.pipe(select(liveChatQuery.getAllLiveChat));
  selectedLiveChat$ = this.store.pipe(
    select(liveChatQuery.getSelectedLiveChat)
  );

  constructor(private store: Store<LiveChatPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadLiveChat());
  }
}
