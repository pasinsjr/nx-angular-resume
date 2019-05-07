import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire';

import { Environment } from '@nx-angular-resume/common-classes';

import {
  LIVECHAT_FEATURE_KEY,
  initialState as liveChatInitialState,
  liveChatReducer
} from './+state/live-chat.reducer';
import { LiveChatEffects } from './+state/live-chat.effects';
import { LiveChatFacade } from './+state/live-chat.facade';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(this.env.firebase),
    StoreModule.forFeature(LIVECHAT_FEATURE_KEY, liveChatReducer, {
      initialState: liveChatInitialState
    }),
    EffectsModule.forFeature([LiveChatEffects])
  ],
  providers: [LiveChatFacade]
})
export class LiveChatModule {
  constructor(private env: Environment) {}
}