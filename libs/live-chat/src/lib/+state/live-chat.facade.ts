import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { UUID } from 'angular2-uuid';

import { LiveChatPartialState } from './live-chat.reducer';
import { liveChatQuery } from './live-chat.selectors';
import {
  LoadLiveChat,
  ConnectLiveChat,
  SendMessage
} from './live-chat.actions';
import { String150 } from '@nx-angular-resume/common-classes';
import {
  UnsendedMessage,
  UnsendedMessageId
} from '../live-chat.public-classes';
import { IUserId } from '@nx-angular-resume/auth';

@Injectable()
export class LiveChatFacade {
  loaded$ = this.store.pipe(select(liveChatQuery.getLoaded));

  messages$ = this.store.pipe(select(liveChatQuery.getMessages));
  unsendedMessages$ = this.store.pipe(
    select(liveChatQuery.getUnsendedMessages)
  );
  errorMessages$ = this.store.pipe(select(liveChatQuery.getErorrMessages));

  constructor(private store: Store<LiveChatPartialState>) {}

  connect() {
    this.store.dispatch(new ConnectLiveChat());
  }

  sendMessage(destinationUser: IUserId, message: String150) {
    this.store.dispatch(
      new SendMessage({
        id: UnsendedMessageId.create(),
        destination: destinationUser,
        description: message
      })
    );
  }

  deleteMessage(message: UnsendedMessage) {}

  resendMessage(message: UnsendedMessage) {}

  loadAll() {
    this.store.dispatch(new LoadLiveChat());
  }
}
