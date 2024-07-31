import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { ModelGoogleSignInLocalStore } from './../../../_models/model/model-google-signin';


import { Injectable } from '@angular/core';


import { BehaviorSubject, catchError, from, Observable, tap, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from '../../../../environments/environment.prod';
import { SnackBarService } from '../../../_share/snack-bar/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { getAuth } from 'firebase/auth';



type SingIn = {
  email: string;
  password: string
}

const app: FirebaseApp = initializeApp(environment.firebase);
const provider = new GoogleAuthProvider();
// const auth = Inject(Auth); /***Não funciona unsado o Inject, tem q ir para construtor */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenExpirationTimer: any;
  userToken$: BehaviorSubject<string> = new BehaviorSubject<string>(''); /**Salvando o Token no model */
  avatarUser$: BehaviorSubject<string> = new BehaviorSubject<string>('')/**Pegando avatar do gmail */
  nameUser$: BehaviorSubject<string> = new BehaviorSubject<string>(''); /**Pegando usuario do gmail */
  isLoginAuthorization$: Observable<boolean> = new Observable(d => d.next(false));   /**Esta variavel sever para liberar o Login pelo Gmail ou Facebook */
  userCredential$!: BehaviorSubject<UserCredential>;
  localAuth = getAuth(app);


  constructor( private snackService: SnackBarService
  ) {

  }


  signIn(params: SingIn): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.localAuth, params.email, params.password)).pipe(tap((d: UserCredential | any) => {

      this.avatarUser$.next(d.user['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png' : d.user['photoURL']);
      this.nameUser$.next(d.user.displayName == null ? 'Hello Pal, you dont have Name in your register yet' : d.user.displayName);
      const expirationDate = new Date(new Date().getTime() + +d._tokenResponse['expiresIn'] * 1000);
      const localUserToken = new ModelGoogleSignInLocalStore(d.user.email, d._tokenResponse.kind,
        d._tokenResponse['localId'], d.user.displayName, d.user.accessToken, d._tokenRespons['refreshToken'], expirationDate,
        d.user['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png' : d.user['photoURL']);
      localStorage.setItem('userData', JSON.stringify(localUserToken)); //Quardaremos em LocalStorage um String com todos os Dados transformado em Json.

    })).pipe(catchError(e => {
      this.snackService.openSnackBar(5000, e.message);
      return throwError(() => e.message);
    }))
  }

  signInUserCredential(params: SingIn): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.localAuth, params.email, params.password)).pipe(tap(res => {
      const localUserToken = res.user.toJSON;
      console.log("ToString: ", localUserToken);
      // localStorage.setItem("userCredential", localUserToken());
      this.userCredential$.next(res)

    }
    )).pipe(catchError((e: HttpErrorResponse) => {
      console.log("Error do catchError: ", e);
      this.snackService.openSnackBar(5000, e.message);
      return throwError(() => e.message);
    }));
  }



}
