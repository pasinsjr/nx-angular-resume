import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  USER_FEATURE_KEY,
  initialState as userInitialState,
  userReducer
} from './+state/user.reducer';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UserEffects } from './+state/user.effects';
import { UserFacade } from './+state/user.facade';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer, {
      initialState: userInitialState
    }),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserFacade, UserService]
})
export class UserModule {}
