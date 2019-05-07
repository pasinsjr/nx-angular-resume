import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TimelineComponent } from './timeline/timeline.component';
import { CardSliderComponent } from './card-slider/card-slider.component';
import { LiveChatComponent } from './live-chat/live-chat.component';
@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: [TimelineComponent, CardSliderComponent, LiveChatComponent],
  exports: [TimelineComponent, CardSliderComponent, LiveChatComponent]
})
export class SharedUiModule {}
