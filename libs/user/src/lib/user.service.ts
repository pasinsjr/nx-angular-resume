import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StringURL } from '@nx-angular-resume/common-classes';
import { User, UserId, UsersObject } from './user.public-classes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  connectUserStorage(): Observable<UsersObject> {
    return this.afs
      .collection<User>('users')
      .snapshotChanges()
      .pipe(
        map(occurs =>
          occurs.reduce(
            (acc, cur) => ({
              ...acc,
              [cur.payload.doc.id]: {
                ...cur.payload.doc.data(),
                uid: UserId.create(cur.payload.doc.id),
                photoURL: StringURL.create(cur.payload.doc.id)
              } as User
            }),
            {}
          )
        )
      );
  }

  updateUser(user: User): Observable<boolean> {
    return from(
      this.afs
        .collection<User>('users')
        .doc(user.uid.value)
        .set({
          name: user.name,
          photoURL: user.photoURL.value
        })
    ).pipe(map(response => true));
  }

  constructor(private afs: AngularFirestore) {}
}
