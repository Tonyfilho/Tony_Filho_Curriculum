import { Auth, getAuth, GoogleAuthProvider, signOut, UserCredential } from '@angular/fire/auth';
import { ModelTokenResponse } from './../../../_models/model/model-google-signin';


import { Injectable } from '@angular/core';


import { BehaviorSubject, catchError, from, Observable, tap, throwError } from 'rxjs';




import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire/app';
import { SnackBarService } from '../../../_share/snack-bar/snack-bar.service';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UnSubscription } from '../../../_share/UnSubscription';
import { IGoogleToken } from '../../../_models/interface/google-token';
import { Location } from '@angular/common';







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
  isLoginAuthorization$: Observable<boolean> = new Observable(d => d.next(false));   /**Esta variavel sever para liberar o Login pelo Gmail ou Facebook */
  userCredential$: BehaviorSubject<UserCredential> = new BehaviorSubject<UserCredential | any>(null); //tem iniciar o construttor para n dar error de subscribe
  tokenResponse$: BehaviorSubject<IGoogleToken | null> = new BehaviorSubject<IGoogleToken | any>(null); //tem iniciar o construttor para n dar error de subscribe
  auth!: Auth;



  constructor(private snackService: SnackBarService, firebaseApp: FirebaseApp, private location: Location,
  ) {
    super();
    this.auth = getAuth(firebaseApp);
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
    })).pipe(catchError((e: HttpErrorResponse) => {
      //    console.log("Error do catchError: ", e);
      this.snackService.openSnackBar(5000, e.message);
      return throwError(() => e.message);
    }));
  }





  

  /**
  * this method will called by user in Logout button and in
  * authoLogout() method.
  */
  logOut = () => {
    signOut(this.auth);
    this.tokenResponse$.next(null);  //limpando Observable
    localStorage.removeItem("userToken");
    this.location.go('/about');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = undefined;

  }


}
