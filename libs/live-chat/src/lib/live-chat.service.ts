import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, combineLatest, of } from 'rxjs';
import { Message, UnsendedMessage } from './live-chat.public-classes';
import { String150 } from '@nx-angular-resume/common-classes';
import { map, take } from 'rxjs/operators';
import { UserId } from '@nx-angular-resume/user';
interface CommonTypeMessage {
  timeStamp: Date;
  destination: string;
  description: string;
}

const messageToCommon = (message: UnsendedMessage) => ({
  timeStamp: new Date(),
  destination: message.destination.value,
  description: message.description.value
});

const commonToMessage = (message: CommonTypeMessage) => ({
  ...message,
  destination: UserId.create(message.destination),
  description: String150.create(message.description)
});

const commonToMessageAdapter = (messages: CommonTypeMessage[]) =>
  messages.map(commonToMessage);

@Injectable({
  providedIn: 'root'
})
export class LiveChatService {
  constructor(private afs: AngularFirestore) {}

  connnetToStream(
    userId: UserId,
    destinationId: UserId
  ): Observable<Message[]> {
    return combineLatest(
      this.afs
        .collection<CommonTypeMessage>(
          `messages/${userId.value}/${destinationId.value}`,
          ref => ref.orderBy('timeStamp').limit(50) //Available only 50 last messages.
        )
        .valueChanges()
        .pipe(map(commonToMessageAdapter)),
      this.afs
        .collection<CommonTypeMessage>(
          `messages/${destinationId.value}/${userId.value}`,
          ref => ref.orderBy('timeStamp').limit(50) //Available only 50 last messages.
        )
        .valueChanges()
        .pipe(map(commonToMessageAdapter)),
      (userMesages, destinationMessages) =>
        [...userMesages, ...destinationMessages].sort((cur, next) =>
          cur.timeStamp > next.timeStamp ? -1 : 1
        )
    );
  }

  createNewSession(
    userId: UserId,
    destinationId: UserId,
    message: UnsendedMessage
  ): Observable<boolean> {
    return from(
      this.afs
        .doc(`messages/${userId.value}`)
        .collection(destinationId.value)
        .add(messageToCommon(message))
    ).pipe(
      take(1),
      map(result => true)
    );
  }

  sendMessage(
    userId: UserId,
    destinationId: UserId,
    message: UnsendedMessage
  ): Observable<boolean> {
    return from(
      this.afs
        .collection<CommonTypeMessage>(
          `messages/${userId.value}/${destinationId.value}`
        )
        .add(messageToCommon(message))
    ).pipe(
      take(1),
      map(result => true)
    );
  }
}
