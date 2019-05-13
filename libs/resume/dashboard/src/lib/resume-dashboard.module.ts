import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeUiModule } from '@nx-angular-resume/resume-ui';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRouthingModule } from './dashboard-routhing.module';
import { AuthModule } from '@nx-angular-resume/auth';
import { SharedUiModule } from '@nx-angular-resume/shared-ui';
import { LiveChatModule } from '@nx-angular-resume/live-chat';

// I have no solutions for sharing env from app module here
import { firebase } from '../environments/firebase-env';

import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularFireModule } from '@angular/fire';
import { UserModule } from '@nx-angular-resume/user';

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    AngularFireModule.initializeApp(firebase),
    NxModule.forRoot(),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    ResumeUiModule,
    DashboardRouthingModule,
    AuthModule,
    UserModule,
    LiveChatModule
  ],
  declarations: [DashboardComponent]
})
export class ResumeDashboardModule {}
