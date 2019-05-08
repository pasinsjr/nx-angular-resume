import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeUiModule } from '@nx-angular-resume/resume-ui';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRouthingModule } from './dashboard-routhing.module';
import { AuthModule } from '@nx-angular-resume/auth';
import { SharedUiModule } from '@nx-angular-resume/shared-ui';
import { LiveChatModule } from '@nx-angular-resume/live-chat';

import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    NxModule.forRoot(),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    ResumeUiModule,
    DashboardRouthingModule,
    AuthModule,
    LiveChatModule
  ],
  declarations: [DashboardComponent]
})
export class ResumeDashboardModule {}
