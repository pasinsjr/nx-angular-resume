import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TimelineComponent } from './timeline/timeline.component';
import { CardSliderComponent } from './card-slider/card-slider.component';
@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: [TimelineComponent, CardSliderComponent],
  exports: [TimelineComponent, CardSliderComponent]
})
export class SharedUiModule {}
