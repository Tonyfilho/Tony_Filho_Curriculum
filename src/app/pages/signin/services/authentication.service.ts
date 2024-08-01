import { Auth, getAuth, GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
import { ModelTokenResponse } from './../../../_models/model/model-google-signin';


import { Injectable } from '@angular/core';


import { BehaviorSubject, catchError, from, Observable, tap, throwError } from 'rxjs';




import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire/app';
import { SnackBarService } from '../../../_share/snack-bar/snack-bar.service';
import { signInWithEmailAndPassword } from 'firebase/auth';







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
export class AuthenticationService {
  private tokenExpirationTimer: any;
  userToken$: BehaviorSubject<string> = new BehaviorSubject<string>(''); /**Salvando o Token no model */
  avatarUser$: BehaviorSubject<string> = new BehaviorSubject<string>('')/**Pegando avatar do gmail */
  nameUser$: BehaviorSubject<string> = new BehaviorSubject<string>(''); /**Pegando usuario do gmail */
  isLoginAuthorization$: Observable<boolean> = new Observable(d => d.next(false));   /**Esta variavel sever para liberar o Login pelo Gmail ou Facebook */
  userCredential$:BehaviorSubject<UserCredential> = new BehaviorSubject<UserCredential | any>(null); //tem iniciar o construttor para n dar error de subscribe
  tokenResponse$: BehaviorSubject<UserCredential> = new BehaviorSubject<UserCredential | any>(null); //tem iniciar o construttor para n dar error de subscribe
  auth!: Auth;



  constructor(private snackService: SnackBarService, firebaseApp: FirebaseApp
  ) {
    this.auth = getAuth(firebaseApp);
  }


  signIn(params: SingIn): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, params.email, params.password)).pipe(tap((res: UserCredential | any) => {

      this.avatarUser$.next(res.user?.['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png' : res.user?.['photoURL']);
      this.nameUser$.next(res.user?.displayName == null ? 'Hello Pal, you dont have Name in your register yet' : res.user?.displayName);
    const expirationDate = new Date(new Date().getTime() + +res?._tokenResponse['expiresIn'] * 1000);
      const localUserToken = new ModelTokenResponse(res?.user.email, res?._tokenResponse.kind,
        res._tokenResponse?.['localId'], res?.user.displayName, res?.user.accessToken, res._tokenRespons?.refreshToken, expirationDate,
        res.user?.['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png' : res.user?.['photoURL']);
      localStorage.setItem('userData', JSON.stringify(localUserToken)); //Quardaremos em LocalStorage um String com todos os Dados transformado em Json.
      console.log("RES: ", {...res});

      this.userCredential$.next(res && res);

    }))
      .pipe(catchError((e: HttpErrorResponse) => {
        this.snackService.openSnackBar(5000, e.message);
        console.log("error no server: ", e)
        return throwError(() => e.message);
      }));
  }

  signInUserCredential(params: SingIn): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, params.email, params.password)).pipe(tap(res => {
      res.user['photoURL'] == null ? './../../../../assets/images/login/no_avatar.png' : res.user['photoURL'];
      this.nameUser$.next(res.user.displayName == null ? 'Hello Pal, you dont have Name in your register yet' : res.user.displayName);

      // localStorage.setItem("userCredential", localUserToken());
      this.userCredential$?.next(res);
    })).pipe(catchError((e: HttpErrorResponse) => {
      console.log("Error do catchError: ", e);
      this.snackService.openSnackBar(5000, e.message);
      return throwError(() => e.message);
    }));
  }

  /**Podemo usar a nova sintax do JS */

  signInUserCredential2 = (params: SingIn) =>  {
     const localRespose = signInWithEmailAndPassword(this.auth, params.email, params.password);
      return from(localRespose).pipe(catchError((e: HttpErrorResponse) => {
        console.log("Error do catchError: ", e);
        this.snackService.openSnackBar(5000, e.message);
        return throwError(() => e.message);
      }));
  }

}
