import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire';

// I have no solution for sharing env from app module here
import { firebase } from '../environments/firebase-env';

import {
  LIVECHAT_FEATURE_KEY,
  initialState as liveChatInitialState,
  liveChatReducer
} from './+state/live-chat.reducer';
import { LiveChatEffects } from './+state/live-chat.effects';
import { LiveChatFacade } from './+state/live-chat.facade';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthModule } from '@nx-angular-resume/auth';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forFeature(LIVECHAT_FEATURE_KEY, liveChatReducer, {
      initialState: liveChatInitialState
    }),
    EffectsModule.forFeature([LiveChatEffects])
  ],
  providers: [LiveChatFacade]
})
export class LiveChatModule {
  constructor() {}
}
