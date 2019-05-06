import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { LiveChatEffects } from './live-chat.effects';
import { LoadLiveChat, LiveChatLoaded } from './live-chat.actions';

describe('LiveChatEffects', () => {
  let actions: Observable<any>;
  let effects: LiveChatEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        LiveChatEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(LiveChatEffects);
  });

  describe('loadLiveChat$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadLiveChat() });
      expect(effects.loadLiveChat$).toBeObservable(
        hot('-a-|', { a: new LiveChatLoaded([]) })
      );
    });
  });
});
