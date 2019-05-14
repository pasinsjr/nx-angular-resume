import { Action } from '@ngrx/store';
import { User } from '../user.public-classes';
export enum UserActionTypes {
  LoadUser = '[User] Load User',
  UserLoaded = '[User] User Loaded',
  UpdateUser = '[User] Update User',
  UpdatedUser = '[User] Updated User',
  UpdateUserError = '[User] Update User Error',
  UserLoadError = '[User] User Load Error'
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
}

export class UserLoadError implements Action {
  readonly type = UserActionTypes.UserLoadError;
  constructor(public payload: any) {}
}

export class UserLoaded implements Action {
  readonly type = UserActionTypes.UserLoaded;
  constructor(
    public allusers: User[],
    public usersObject: { [key: string]: User }
  ) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor(public user: User) {}
}

export class UpdatedUser implements Action {
  readonly type = UserActionTypes.UpdatedUser;
}

export class UpdateUserError implements Action {
  readonly type = UserActionTypes.UpdateUserError;
}

export type UserAction =
  | LoadUser
  | UpdateUser
  | UpdatedUser
  | UpdateUserError
  | UserLoaded
  | UserLoadError;

export const fromUserActions = {
  LoadUser,
  UpdateUser,
  UpdatedUser,
  UpdateUserError,
  UserLoaded,
  UserLoadError
};
