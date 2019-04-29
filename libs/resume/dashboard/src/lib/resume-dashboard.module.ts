import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeProfileModule } from '@nx-angular-resume/resume/profile';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRouthingModule } from './dashboard-routhing.module';
@NgModule({
  imports: [CommonModule, ResumeProfileModule, DashboardRouthingModule],
  declarations: [DashboardComponent]
})
export class ResumeDashboardModule {}
