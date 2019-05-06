import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { LiveChatEffects } from './live-chat.effects';
import { LiveChatFacade } from './live-chat.facade';

import { liveChatQuery } from './live-chat.selectors';
import { LoadLiveChat, LiveChatLoaded } from './live-chat.actions';
import {
  LiveChatState,
  Entity,
  initialState,
  liveChatReducer
} from './live-chat.reducer';

interface TestSchema {
  liveChat: LiveChatState;
}

describe('LiveChatFacade', () => {
  let facade: LiveChatFacade;
  let store: Store<TestSchema>;
  let createLiveChat;

  beforeEach(() => {
    createLiveChat = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('liveChat', liveChatReducer, { initialState }),
          EffectsModule.forFeature([LiveChatEffects])
        ],
        providers: [LiveChatFacade]
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
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allLiveChat$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allLiveChat$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `LiveChatLoaded` to manually submit list for state management
     */
    it('allLiveChat$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allLiveChat$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new LiveChatLoaded([createLiveChat('AAA'), createLiveChat('BBB')])
        );

        list = await readFirst(facade.allLiveChat$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
