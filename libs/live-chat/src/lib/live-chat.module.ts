import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  LIVECHAT_FEATURE_KEY,
  initialState as liveChatInitialState,
  liveChatReducer
} from './+state/live-chat.reducer';
import { LiveChatEffects } from './+state/live-chat.effects';
import { LiveChatFacade } from './+state/live-chat.facade';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LiveChatService } from './live-chat.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forFeature(LIVECHAT_FEATURE_KEY, liveChatReducer, {
      initialState: liveChatInitialState
    }),
    EffectsModule.forFeature([LiveChatEffects])
  ],
  providers: [LiveChatFacade, LiveChatService]
})
export class LiveChatModule {
  constructor() {}
}
