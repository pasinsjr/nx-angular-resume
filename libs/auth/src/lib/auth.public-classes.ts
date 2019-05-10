import { GoogleLogin } from './+state/auth.actions';
import { inherits } from 'util';
import { StringURL, StringPath } from '@nx-angular-resume/common-classes';

export class IUserId {
  private constructor(public value: string) {}

  public static create(value: string) {
    return new IUserId(value);
  }
}

export interface IUser {
  uid: IUserId;
  loading?: boolean;
  error?: string;
}

export class GoogleUser implements IUser {
  constructor(
    public uid: IUserId,
    public photoURL: StringURL | StringPath,
    public loading: boolean = false,
    public error: string = null
  ) {}
}

export class GoogleAnonymousUser implements IUser {
  constructor(
    public uid: IUserId,
    public loading: boolean = false,
    public error: string = null
  ) {}
}
