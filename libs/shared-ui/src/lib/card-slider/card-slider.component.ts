import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  String20,
  StringPath,
  StringURL
} from '@nx-angular-resume/common-classes';

interface CardElement {
  title: String20;
  imgSrc: StringPath | StringURL;
  description: string;
}

@Component({
  selector: 'nx-angular-resume-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSliderComponent implements OnInit {
  @Input() cards: CardElement[];

  constructor() {}

  ngOnInit() {}
}
