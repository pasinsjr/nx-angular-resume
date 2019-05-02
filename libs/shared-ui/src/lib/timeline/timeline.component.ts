import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { String40 } from '@nx-angular-resume/common-classes';

interface TimelineElement {
  header: String40;
  timeRange: String40;
  secondDescription: string;
  detailLines: string[];
}

@Component({
  selector: 'nx-angular-resume-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
  @Input() timeLineElements: TimelineElement[];

  constructor() {}
}
