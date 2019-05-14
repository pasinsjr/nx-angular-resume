import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { LiveChatPartialState } from './live-chat.reducer';
import { liveChatQuery } from './live-chat.selectors';
import { ConnectLiveChat, PrepareToSendMessage } from './live-chat.actions';
import { String150 } from '@nx-angular-resume/common-classes';
import { UserId } from '@nx-angular-resume/user';

@Injectable()
export class LiveChatFacade {
  connected$ = this.store.pipe(select(liveChatQuery.getConnected));

  messages$ = this.store.pipe(select(liveChatQuery.getMessages));
  unsendedMessages$ = this.store.pipe(
    select(liveChatQuery.getUnsendedMessages)
  );
  errorMessages$ = this.store.pipe(select(liveChatQuery.getErorrMessages));

  constructor(private store: Store<LiveChatPartialState>) {}

  connect(userId: UserId, destinationId: UserId) {
    this.store.dispatch(new ConnectLiveChat(userId, destinationId));
  }

  sendMessage(message: String150) {
    this.store.dispatch(new PrepareToSendMessage(message));
  }
}
