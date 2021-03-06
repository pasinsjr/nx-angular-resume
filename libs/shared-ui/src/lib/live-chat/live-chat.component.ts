import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import { String150 } from '@nx-angular-resume/common-classes';

import { User, UserId } from '@nx-angular-resume/user';

interface Message {
  timeStamp: Date;
  description: String150;
  destination: UserId;
}
@Component({
  selector: 'nx-angular-resume-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveChatComponent implements OnInit, AfterViewChecked {
  @Input()
  set messages(messages: Message[]) {
    this._messages = messages;
    this.neeedToScroll = true;
  }

  @Input() anonymousMode: boolean;

  @Input() user: User;
  @Input() destinationUser: User;

  @Output() sendMessage: EventEmitter<String150> = new EventEmitter();
  @Output() linkAccount: EventEmitter<void> = new EventEmitter();

  @ViewChild('chatBox')
  private chatBox: ElementRef;

  private neeedToScroll: boolean;

  _messages: Message[];
  testInput: string;

  activeMobileLiveChat: boolean;

  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    if (this.neeedToScroll) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
      this.neeedToScroll = false;
    }
  }

  emitMessage(): void {
    this.sendMessage.emit(String150.create(this.testInput));
    this.testInput = '';
  }

  emitLinkAccount(): void {
    this.linkAccount.emit();
  }
}
