import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  PROFILE_FEATURE_KEY,
  initialState as profileInitialState,
  profileReducer
} from './+state/profile.reducer';
import { ProfileEffects } from './+state/profile.effects';
import { ProfileFacade } from './+state/profile.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(PROFILE_FEATURE_KEY, profileReducer, {
      initialState: profileInitialState
    }),
    EffectsModule.forFeature([ProfileEffects])
  ],
  providers: [ProfileFacade]
})
export class ResumeProfileModule {}
