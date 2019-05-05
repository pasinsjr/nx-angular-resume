import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { ProfilePartialState } from './profile.reducer';
import { profileQuery } from './profile.selectors';
import { LoadProfile } from './profile.actions';

@Injectable()
export class ProfileFacade {
  loaded$ = this.store.pipe(select(profileQuery.getLoaded));
  allProfile$ = this.store.pipe(select(profileQuery.getAllProfile));
  selectedProfile$ = this.store.pipe(select(profileQuery.getSelectedProfile));

  constructor(private store: Store<ProfilePartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadProfile());
  }
}
