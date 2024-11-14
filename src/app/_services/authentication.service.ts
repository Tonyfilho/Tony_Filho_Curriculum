import { inject, Injectable, signal } from '@angular/core';

import { catchError, from, Observable, throwError } from 'rxjs';

import { ErrorSnackBarService } from '../_share/pop-up/error-pop-up/error-snack-bar.service';
import { UnSubscription } from '../_share/UnSubscription';

import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { IRegister } from '../_models/interface/share-interfaces';
import { updatePhoneNumber } from 'firebase/auth';

// type SingIn = {
//   email: string;
//   password?: string;
//   userName?: string
// }

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends UnSubscription {
  private auth: Auth = inject(Auth);
  // isLoginAuthorization$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);   /**Esta variavel sever para liberar o Login no Header*/

  /**
   * 1º Usando o AngularFire, temos que criar um observable de State para passar a gerir o state sem precisa de usar cookeis e LocalStorage.
   * Se houver Login ele recebe o Response com Data ,caso não ele recebe Null.
   */
  user$: Observable<User | null> = user(
    this.auth
  ); /**Ja carrega todo User, no caso de AngularFire */
  /**
   * 2º Temos que criar um Signal para ser usado atraves de toda aplicação, este User há muita informação no objeto
   * se a necessidade de termos isto no Navegador, teremos o Signal com 3 paramentros.
   * Usaremos o UNDEFINED antes de fazer o fetch do User, depois disto o null.
   * 3ª Irmos no AppComponent e setar o Signal
   */
  currentUserSig = signal<Partial<User> | null | undefined>(undefined);
  isAuthUserSig = signal<boolean>(false);
  gdprAccessSig = signal<boolean>(false);

  constructor(private snackService: ErrorSnackBarService) {
    super();
  }
  /**Update Profile */
  protected updateProfileCreated(
    userCredencial: UserCredential,
    user?: Partial<User>
  ) {
    updateProfile(userCredencial.user, {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    });
  }

  /**Create User */
  createUserWithByEmailAndPassword = (
    user: Partial<User>,
    password: string
  ) => {
    const localPromise = createUserWithEmailAndPassword(
      this.auth,
      user.email!,
      password
    ).then(
      (response: UserCredential) =>        
        this.updateProfileCreated(response, user)
      
    );
    return from(localPromise);
  };

  /**Quando usa o AngularFire não precisa usar HttpClient e não se implementa Interceptor, pois isto será feito automaticamente pelo AngularFire */
  sigInWithEmailAndPassword = (email: string, password: string) => {
    const localPromise = signInWithEmailAndPassword(
      this.auth,
       email,
      password
    );
    return from(localPromise).pipe(
      catchError((e: any) => {
        this.snackService.openErrorSnackBar(5000, e.code);
        return throwError(() => e.code);
      })
    );
  };

  reSendPassword = (email: string): Observable<void> => {
    const localPromise = sendPasswordResetEmail(this.auth, email);
    return from(localPromise);
  };

  logOut() {
    signOut(this.auth);
    this.currentUserSig.set(null);
  }
}
