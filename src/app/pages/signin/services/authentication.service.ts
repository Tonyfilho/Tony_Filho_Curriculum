import { ModelGoogleSignInLocalStore } from './../../../_models/model/model-google-signin';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';


import { Injectable } from '@angular/core';


import { BehaviorSubject, catchError, from, map, Observable, of, tap } from 'rxjs';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { environment } from '../../../../environments/environment.prod';



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


  constructor( private auth: Auth,) {

  }


  signIn(params: SingIn): Observable<UserCredential> {
     return from(signInWithEmailAndPassword(this.auth, params.email, params.password)).pipe(tap(d =>  {
     // console.log("tap: data: ",( <any>d.user.getIdToken()) )
      this.avatarUser$.next(d.user['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png': d.user['photoURL'] );
      this.nameUser$.next(d.user.displayName == null ? 'Hello Pal, you dont have Name in your register yet': d.user.displayName);
    }), map((e: any) => {
       const expirationDate = new Date(new Date().getTime() + +e._tokenResponse['expiresIn'] * 1000);
       const localUserToken = new ModelGoogleSignInLocalStore(e.user.email, e._tokenResponse.kind,
        e._tokenResponse['localId'], e.user.displayName,  e.user.accessToken, e._tokenRespons['refreshToken'], expirationDate,
        e.user['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png': e.user['photoURL']);
       localStorage.setItem('userData', JSON.stringify(localUserToken)); //Quardaremos em LocalStorage um String com todos os Dados.


    })
    , catchError(e => {
      return of (e);
    }))}

}
