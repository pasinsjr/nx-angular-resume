import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { LiveChatEffects } from './live-chat.effects';
import { LiveChatFacade } from './live-chat.facade';

import { liveChatQuery } from './live-chat.selectors';
import { ConnectLiveChat } from './live-chat.actions';
import {
  LiveChatState,
  initialState,
  liveChatReducer
} from './live-chat.reducer';
import { UserId } from '@nx-angular-resume/user';
import { LiveChatService } from '../live-chat.service';
import { of } from 'rxjs';

interface TestSchema {
  liveChat: LiveChatState;
}

describe('LiveChatFacade', () => {
  let facade: LiveChatFacade;
  let store: Store<TestSchema>;

  const mockLiveChatService = {
    connectToStream: jest.fn(),
    createNewSession: jest.fn(),
    sendMessage: jest.fn()
  } as any;

  const mockEmptyListObservable = of([]);

  const mockUserIdA = UserId.create('a');
  const mockUserIdB = UserId.create('b');

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('liveChat', liveChatReducer, { initialState }),
          EffectsModule.forFeature([LiveChatEffects])
        ],
        providers: [
          LiveChatFacade,
          {
            provide: LiveChatService,
            useValue: mockLiveChatService
          }
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(LiveChatFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('connect() should return list observable with connected == true', async done => {
      try {
        let message$ = await readFirst(facade.messages$);
        let isConnected = await readFirst(facade.connected$);

        expect(message$).toBe(null);
        expect(isConnected).toBe(false);

        mockLiveChatService.connectToStream.mockReturnValueOnce(
          mockEmptyListObservable
        );

        facade.connect(mockUserIdA, mockUserIdB);

        message$ = await readFirst(facade.messages$);
        isConnected = await readFirst(facade.connected$);

        expect(message$).toBe(mockEmptyListObservable);
        expect(isConnected).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
