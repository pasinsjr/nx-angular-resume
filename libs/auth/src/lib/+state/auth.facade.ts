import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { LoadAuth } from './auth.actions';

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(authQuery.getLoaded));
  allAuth$ = this.store.pipe(select(authQuery.getAllAuth));
  user$ = this.store.pipe(select(authQuery.getUser));

  constructor(private store: Store<AuthPartialState>) {}

  loadAuth() {
    this.store.dispatch(new LoadAuth());
  }
}
