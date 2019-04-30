import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeUiModule } from '@nx-angular-resume/resume-ui';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRouthingModule } from './dashboard-routhing.module';

@NgModule({
  imports: [CommonModule, ResumeUiModule, DashboardRouthingModule],
  declarations: [DashboardComponent]
})
export class ResumeDashboardModule {}
