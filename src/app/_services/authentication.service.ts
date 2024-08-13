
import { inject, Injectable, signal } from '@angular/core';

import { BehaviorSubject, catchError, from, Observable, throwError } from 'rxjs';

import { Location } from '@angular/common';
import { SnackBarService } from '../_share/snack-bar/snack-bar.service';
import { UnSubscription } from '../_share/UnSubscription';

import { FirebaseApp } from '@angular/fire/app';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, User } from '@angular/fire/auth';







type SingIn = {
  email: string;
  password?: string;
  userName?: string
}

//const app: FirebaseApp = initializeApp(environment.firebase)//OBS: So funciona se usaro construtor
// const auth = Inject(Auth); /***Não funciona unsado o Inject, tem q ir para construtor */

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends UnSubscription {

  private auth: Auth = inject(Auth);
  isLoginAuthorization$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);   /**Esta variavel sever para liberar o Login no Header*/

  /**
   * 1º Usando o AngularFire, temos que criar um observable de State para passar a gerir o state sem precisa de usar cookeis e LocalStorage.
   * Se houver Login ele recebe o Response com Data ,caso não ele recebe Null.
  */
  user$: Observable<User | null> = user(this.auth);
  /**
   * 2º Temos que criar um Signal para ser usado atraves de toda aplicação, este User há muita informação no objeto
   * se a necessidade de termos isto no Navegador, teremos o Signal com 3 paramentros.
   * Usaremos o UNDEFINED antes de fazer o fetch do User, depois disto o null.
   * 3ª Irmos no AppComponent e setar o Signal
   */



  
  currentUserSig = signal<SingIn | null | undefined>(undefined);


  constructor(private snackService: SnackBarService, firebaseApp: FirebaseApp, private location: Location,
  ) {
    super();
  }

  registerUserByEmail = (parans: SingIn) => {
    const localPromise = createUserWithEmailAndPassword(this.auth, parans.email, parans.password!).then(response => updateProfile(response.user, { displayName: parans?.userName }));
    from(localPromise);

  }

  /**Quando usa o AngularFire não precisa usar HttpClient e não se implementa Interceptor, pois isto será feito automaticamente pelo AngularFire */
  logInWithEmailAndPassword = (parans: SingIn) => {
    const localPromise = signInWithEmailAndPassword(this.auth, parans.email, parans.password!);
    return from(localPromise).pipe(catchError((e: any) => {
      this.snackService.openSnackBar(5000, e.code);
      this.isLoginAuthorization$.next(false);
      return throwError(() => e.code);
    }));



  }


  logOut() {
    signOut(this.auth);
    this.currentUserSig.set(null);

  }

}
