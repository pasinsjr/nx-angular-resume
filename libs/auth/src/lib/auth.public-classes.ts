export class IUserId {
  private constructor(public value: string) {}

  public static create(value: string) {
    return new IUserId(value);
  }
}

export interface IUser {
  uid: IUserId;
  displayName: string;
  photoURL: string;
  loading?: boolean;
  error?: string;
}
