import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AuthPartialState } from './auth.reducer';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  LoadAuth,
  AuthLoaded,
  AuthLoadError,
  AuthActionTypes,
  AnonymousLogin,
  GoogleLogin
} from './auth.actions';

import { map } from 'rxjs/operators';
import { from } from 'rxjs';

import { auth } from 'firebase/app';
import {
  IUserId,
  GoogleAnonymousUser,
  GoogleUser
} from '../auth.public-classes';
import { StringURL } from '@nx-angular-resume/common-classes';
@Injectable()
export class AuthEffects {
  @Effect() loadAuth$ = this.dataPersistence.fetch(AuthActionTypes.LoadAuth, {
    run: (action: LoadAuth, state: AuthPartialState) => {
      return this.afAuth.authState.pipe(
        map(authData =>
          authData
            ? new AuthLoaded(
                authData.isAnonymous
                  ? new GoogleAnonymousUser(IUserId.create(authData.uid))
                  : new GoogleUser(
                      IUserId.create(authData.uid),
                      authData.displayName,
                      StringURL.create(authData.photoURL)
                    )
              )
            : new AnonymousLogin()
        )
      );
    },

    onError: (action: LoadAuth, error) => {
      console.error('Error', error);
      return new AuthLoadError(error);
    }
  });

  @Effect() annonymousLogin$ = this.dataPersistence.fetch(
    AuthActionTypes.AnonymousLogin,
    {
      run: (action: AnonymousLogin, state: AuthPartialState) => {
        return from(this.afAuth.auth.signInAnonymously()).pipe(
          map(credential => new LoadAuth())
        );
      },
      onError: (action: AnonymousLogin, error) => {
        console.error('Error', error);
        return new AuthLoadError(error);
      }
    }
  );

  @Effect()
  googleLoginEffect$ = this.dataPersistence.fetch(AuthActionTypes.GoogleLogin, {
    run: (action: GoogleLogin, state: AuthPartialState) => {
      return from(
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      ).pipe(map(credential => new LoadAuth()));
    },

    onError: (action: GoogleLogin, error) => {
      console.error('Error', error);
      return new AuthLoadError(error);
    }
  });

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private dataPersistence: DataPersistence<AuthPartialState>
  ) {}
}
