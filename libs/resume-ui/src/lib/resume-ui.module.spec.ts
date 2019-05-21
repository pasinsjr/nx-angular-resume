import { async, TestBed } from '@angular/core/testing';
import { ResumeUiModule } from './resume-ui.module';

describe('ResumeUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ResumeUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ResumeUiModule).toBeDefined();
  });
});
