import { async, TestBed } from '@angular/core/testing';
import { ResumeDashboardModule } from './resume-dashboard.module';

describe('ResumeDashboardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ResumeDashboardModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ResumeDashboardModule).toBeDefined();
  });
});
