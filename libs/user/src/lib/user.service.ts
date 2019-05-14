import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserId, UsersObject } from './user.public-classes';
import { StringURL } from '@nx-angular-resume/common-classes';

interface CommonTypeUser {
  uid: string;
  name: string;
  photoURL?: string;
}

const userToCommon = (user: User): CommonTypeUser =>
  ({
    uid: user.uid.value,
    name: user.name,
    photoURL: user.photoURL.value
  } as CommonTypeUser);

const commonToUser = (user: CommonTypeUser): User =>
  ({
    ...user,
    uid: UserId.create(user.uid),
    photoURL: StringURL.create(user.photoURL)
  } as User);

const commonToUserAdapter = (users: CommonTypeUser[]): User[] =>
  users.map(commonToUser);

@Injectable({
  providedIn: 'root'
})
export class UserService {
  connectUserStorage(): Observable<User[]> {
    return this.afs
      .collection<CommonTypeUser>('users')
      .snapshotChanges()
      .pipe(
        map(occurs =>
          occurs.map(
            occur =>
              ({
                ...occur.payload.doc.data(),
                uid: occur.payload.doc.id
              } as CommonTypeUser)
          )
        ),
        map(commonToUserAdapter)
      );
  }

  updateUser(user: User): Observable<boolean> {
    return from(
      this.afs
        .collection<CommonTypeUser>('users')
        .doc(user.uid.value)
        .set({
          name: user.name,
          photoURL: user.photoURL.value
        })
    ).pipe(map(response => true));
  }

  constructor(private afs: AngularFirestore) {}
}
