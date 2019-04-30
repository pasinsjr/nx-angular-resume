import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfessionalComponent } from './professional/professional.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProfileComponent, ProfessionalComponent],
  exports: [ProfileComponent, ProfessionalComponent]
})
export class ResumeUiModule {}
