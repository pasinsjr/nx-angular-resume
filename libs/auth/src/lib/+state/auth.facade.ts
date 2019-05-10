import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { LoadAuth, GoogleLogin } from './auth.actions';
import { GoogleAnonymousUser } from '../auth.public-classes';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(authQuery.getLoaded));
  allAuth$ = this.store.pipe(select(authQuery.getAllAuth));
  user$ = this.store.pipe(select(authQuery.getUser));
  isAnnonymous$ = this.store.pipe(
    select(authQuery.getUser),
    map(user => user instanceof GoogleAnonymousUser)
  );

  constructor(private store: Store<AuthPartialState>) {}

  loadAuth() {
    this.store.dispatch(new LoadAuth());
  }

  loginWithGoogle(): void {
    this.store.dispatch(new GoogleLogin());
  }
}
