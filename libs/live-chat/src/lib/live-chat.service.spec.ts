import { TestBed } from '@angular/core/testing';

import { LiveChatService } from './live-chat.service';
import { AngularFirestore } from '@angular/fire/firestore';

describe('LiveChatService', () => {
  const mockAngularFireStore = {};

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        LiveChatService,
        {
          provide: AngularFirestore,
          useValue: mockAngularFireStore
        }
      ]
    })
  );

  it('should be created', () => {
    const service: LiveChatService = TestBed.get(LiveChatService);
    expect(service).toBeTruthy();
  });
});
