import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef
} from '@angular/core';
import {
  String20,
  StringPath,
  StringURL
} from '@nx-angular-resume/common-classes';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

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

  constructor(private renderrer: Renderer2) {}

  ngOnInit() {}

  onDragEnded(event: CdkDragEnd) {
    const source: any = event.source;
    event.source.reset();
    this.renderrer.addClass(source.element.nativeElement, 'transition-move');
    setTimeout(() => {
      this.renderrer.removeClass(
        event.source.element.nativeElement,
        'transition-move'
      );
    }, 500);
  }
}
