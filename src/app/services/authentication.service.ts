import { Auth, getAuth, GoogleAuthProvider, signOut, UserCredential } from '@angular/fire/auth';



import { Injectable } from '@angular/core';


import { BehaviorSubject, catchError, from, Observable, tap, throwError } from 'rxjs';


import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire/app';

import { signInWithEmailAndPassword } from 'firebase/auth';


import { Location } from '@angular/common';
import { IGoogleToken } from '../_models/interface/google-token';
import { ModelTokenResponse } from '../_models/model/model-google-signin';
import { SnackBarService } from '../_share/snack-bar/snack-bar.service';
import { UnSubscription } from '../_share/UnSubscription';







type SingIn = {
  email: string;
  password: string
}

//const app: FirebaseApp = initializeApp(environment.firebase)//OBS: So funciona se usaro construtor
// const auth = Inject(Auth); /***Não funciona unsado o Inject, tem q ir para construtor */
const provider = new GoogleAuthProvider();
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends UnSubscription {
  private tokenExpirationTimer: any;
  isLoginAuthorization$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);   /**Esta variavel sever para liberar o Login no Header*/
  userCredential$: BehaviorSubject<UserCredential> = new BehaviorSubject<UserCredential | any>(null); //tem iniciar o construttor para n dar error de subscribe
  tokenResponse$: BehaviorSubject<IGoogleToken | null> = new BehaviorSubject<IGoogleToken | any>(null); //tem iniciar o construttor para n dar error de subscribe
  auth!: Auth;



  constructor(private snackService: SnackBarService, firebaseApp: FirebaseApp, private location: Location,
  ) {
    super();
    this.auth = getAuth(firebaseApp);
    this.autoLogin();
  }

  private handAuthentication = () => {
    this.tokenResponse$.pipe(tap((localUserToken: IGoogleToken | null) => {
      return localStorage.setItem('userToken', JSON.stringify(localUserToken)); //Quardaremos em LocalStorage um String com todos os Dados transformado em Json.

    })).subscribe();

  }

  signIn(params: SingIn): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, params.email, params.password)).pipe(tap((res: UserCredential | any) => {
      const expirationDate = new Date(new Date().getTime() + +res?._tokenResponse['expiresIn'] * 1000);
      const localUserToken = new ModelTokenResponse(res?.user.email, res?._tokenResponse.kind,
        res._tokenResponse?.['localId'], res?.user.displayName, res?.user.accessToken, res._tokenRespons?.refreshToken, expirationDate,
        res.user?.['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png' : res.user?.['photoURL']);
      this.tokenResponse$.next(localUserToken); //Esta variavel é para salvar o token
      this.userCredential$.next(res && res.user);
      this.isLoginAuthorization$.next(true);
    }))
      .pipe(catchError((e: HttpErrorResponse) => {
        this.snackService.openSnackBar(5000, e.message);
        console.log("error no server: ", e)
        return throwError(() => e.message);
      }));
  }

  /**Podemo usar a nova sintax do JS */

  signInUserCredential = (params: SingIn) => {
    this.handAuthentication();
    const localRespose = signInWithEmailAndPassword(this.auth, params.email, params.password);
    return from(localRespose).pipe(tap((res: UserCredential | any) => {
      const expirationDate = new Date(new Date().getTime() + +res?._tokenResponse['expiresIn'] * 1000);
      const localUserToken = new ModelTokenResponse(res?.user.email, res?._tokenResponse.kind,
        res._tokenResponse?.['localId'], res?.user.displayName, res?.user.accessToken, res._tokenRespons?.refreshToken, expirationDate,
        res.user?.['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png' : res.user?.['photoURL']);
      this.tokenResponse$.next(localUserToken); //Esta variavel é para salvar o token
      this.userCredential$?.next(res && res.user);
      this.isLoginAuthorization$.next(true);
    })).pipe(catchError((e: HttpErrorResponse) => {
      //    console.log("Error do catchError: ", e);
      this.snackService.openSnackBar(5000, e.message);
      return throwError(() => e.message);
    }));
  }

  /**
   * autoLogin will put in the AppComponent and everytime it will be reload
   * the data will load from LOCALSTORAGE.
   * 1º I need to check if already  signIn if doenst have , the Observable VAR hasUserLogin will be null
   * 2º If got a token I update the Observable User VAR
   * 3ª create a expiration date and calc the time after signIn
   * 4º start autoLogout
   * 5º The method must be called in the OnInit() and never in the Constructor.
   */

    autoLogin = () => {
     const localGetStorage: IGoogleToken = JSON.parse(localStorage.getItem('userToken') as string);
    // console.log("LocalStorage ", localGetStorage);
    if (!localGetStorage) {
      return;
    }
    const localTokenResponse: IGoogleToken  =  new ModelTokenResponse(localGetStorage?.email, localGetStorage?.kind,
      localGetStorage?.['localId'], localGetStorage.displayName, localGetStorage.idToken, localGetStorage?.refreshToken, localGetStorage.expiresIn,
      localGetStorage['avatar'] == null ? './../../../../assets/images/login/no_avatar.png' : localGetStorage?.['avatar']);
      this.tokenResponse$.next(localTokenResponse);
      let localExpirationTime = new Date(localGetStorage.expiresIn).getTime() - new Date().getTime();
     this.autoLogOut(localExpirationTime);



    }




  /**
   *
   * @param expirationDate Get time of the Firebase Auth API and calc the expieration date
   * after the expieration data done, it will call the logout() method.
   */
  private autoLogOut = (expirationDate: number) =>  {
    this.tokenExpirationTimer = setTimeout (() => {
      this.logOut();
    }, expirationDate);

  }



  /**
  * this method will called by user in Logout button and in
  * authoLogout() method.
  */
  logOut = () => {
    signOut(this.auth);
    this.tokenResponse$.next(null);  //limpando Observable
    localStorage.removeItem("userToken"); //limpando o LocalStore
    this.isLoginAuthorization$.next(false);
    this.location.go('/about');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

  }


}
