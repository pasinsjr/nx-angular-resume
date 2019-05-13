import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { UserPartialState } from './user.reducer';
import { userQuery } from './user.selectors';
import { LoadUser, UpdateUser } from './user.actions';
import { Observable } from 'rxjs';
import { User } from '../user.public-classes';

@Injectable()
export class UserFacade {
  loaded$ = this.store.pipe(select(userQuery.getLoaded));
  allUser$ = this.store.pipe(select(userQuery.getAllUser));

  constructor(private store: Store<UserPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadUser());
  }

  getSelectedUser(userId: string): Observable<User> {
    return this.store.pipe(select(userQuery.selectUser(userId)));
  }

  updateUser(user: User): void {
    this.store.dispatch(new UpdateUser(user));
  }
}
