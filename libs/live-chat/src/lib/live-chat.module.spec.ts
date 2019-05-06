import { async, TestBed } from '@angular/core/testing';
import { LiveChatModule } from './live-chat.module';

describe('LiveChatModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LiveChatModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LiveChatModule).toBeDefined();
  });
});
