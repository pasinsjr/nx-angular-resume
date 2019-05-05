import { async, TestBed } from '@angular/core/testing';
import { ResumeProfileModule } from './resume-profile.module';

describe('ResumeProfileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ResumeProfileModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ResumeProfileModule).toBeDefined();
  });
});
