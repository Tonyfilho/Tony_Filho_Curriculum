
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {  Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';


type SingIn = {
  email: string;
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth ) {

  }




  signIn(params: SingIn): Observable<any> {

    return from( this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));


  }

}
