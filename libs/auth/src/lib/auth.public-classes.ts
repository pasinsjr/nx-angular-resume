import { GoogleLogin } from './+state/auth.actions';
import { inherits } from 'util';

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
  uid: IUserId;
  displayName: string;
  photoURL: string;
  loading?: boolean;
  error?: string;
}

export class GoogleAnonymousUser implements IUser {
  uid: IUserId;
  loading?: boolean;
  error?: string;
}
