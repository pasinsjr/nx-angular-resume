import { StringURL, StringPath } from '@nx-angular-resume/common-classes';

export class UserId {
  private constructor(public value: string) {}

  public static create(value: string) {
    return new UserId(value);
  }
}

export interface User {
  uid: UserId;
  name: string;
  photoURL?: StringURL | StringPath;
}

export interface UsersObject {
  [key: string]: User;
}
