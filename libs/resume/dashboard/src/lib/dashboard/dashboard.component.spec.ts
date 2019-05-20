import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { AuthFacade, AuthModule } from '@nx-angular-resume/auth';
import { UserFacade, UserModule } from '@nx-angular-resume/user';
import { LiveChatModule } from '@nx-angular-resume/live-chat';
import { ResumeUiModule } from '@nx-angular-resume/resume-ui';
import { SharedUiModule } from '@nx-angular-resume/shared-ui';
import { LiveChatContainerComponent } from '../live-chat-container/live-chat-container.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  const authFacadeMock = {
    loadAuth: jest.fn()
  } as any;
  const userFacadeMock = {
    loadAll: jest.fn()
  } as any;

  beforeEach(() => {
    component = new DashboardComponent(authFacadeMock, userFacadeMock);
    component.ngOnInit();
  });

  it('should be called loadAll', () => {
    expect(authFacadeMock.loadAuth).toHaveBeenCalled();
    expect(userFacadeMock.loadAll).toHaveBeenCalled();
  });
});
