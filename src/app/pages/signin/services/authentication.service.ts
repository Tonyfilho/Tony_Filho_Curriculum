
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Injectable } from '@angular/core';

import { initializeApp } from '@angular/fire/app';
import { from, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';



type SingIn = {
  email: string;
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  app = initializeApp(environment.firebase);
  constructor(private auth: AngularFireAuth ) {

  }




  signIn(params: SingIn): Observable<any> {

    return from( this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));


  }

}
