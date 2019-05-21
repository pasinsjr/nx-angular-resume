import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { LiveChatEffects } from './live-chat.effects';
import {
  ConnectLiveChat,
  UpdateMessages,
  NotFoundCollectionsError
} from './live-chat.actions';
import { UserId } from '@nx-angular-resume/user';
import { LiveChatService } from '../live-chat.service';
import { UnsendedMessage } from '../live-chat.public-classes';
import { LIVECHAT_FEATURE_KEY, liveChatReducer } from './live-chat.reducer';

describe('LiveChatEffects', () => {
  let actions: Observable<any>;
  let effects: LiveChatEffects;

  const mockLiveChatService = {
    connectToStream: jest.fn(),
    createNewSession: jest.fn(),
    sendMessage: jest.fn()
  } as any;

  const mockUserIdA = UserId.create('a');
  const mockUserIdB = UserId.create('b');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature(LIVECHAT_FEATURE_KEY, liveChatReducer, {
          initialState: {
            messages: null,
            unsendedMessages: [],
            errorMessages: [],
            requestToMessageUsers: [],
            userId: mockUserIdA,
            destinationId: mockUserIdB,
            connected: false
          }
        })
      ],
      providers: [
        LiveChatEffects,
        DataPersistence,
        {
          provide: LiveChatService,
          useValue: mockLiveChatService
        },
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(LiveChatEffects);
  });

  describe('connectToStream$', () => {
    it('should connect to stream', () => {
      const messagesObservable = of([]);
      mockLiveChatService.connectToStream.mockReturnValueOnce(
        messagesObservable
      );
      actions = hot('-a-|', {
        a: new ConnectLiveChat(mockUserIdA, mockUserIdB)
      });
      expect(effects.connectToStream$).toBeObservable(
        hot('-a-|', { a: new UpdateMessages(messagesObservable) })
      );
    });
  });

  describe('createNewCollections$', () => {
    it('should create new session', () => {
      const mockUnsendMessage = {} as UnsendedMessage;
      mockLiveChatService.createNewSession.mockReturnValueOnce(of(true));
      actions = hot('-a-|', {
        a: new NotFoundCollectionsError(mockUnsendMessage)
      });

      expect(effects.createNewCollections$).toBeObservable(
        hot('-a-|', {
          a: new ConnectLiveChat(mockUserIdA, mockUserIdB)
        })
      );
    });
  });
});
