import { Auth, getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';


import { Inject, inject, Injectable } from '@angular/core';


import { from, Observable, of } from 'rxjs';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';

//import { FirebaseApp, initializeApp } from '@angular/fire/app'
import { environment } from '../../../../environments/environment.prod';
import { FirebaseApp, initializeApp } from 'firebase/app';



type SingIn = {
  email: string;
  password: string
}

const app: FirebaseApp = initializeApp(environment.firebase);
const provider = new GoogleAuthProvider();
// const auth = Inject(Auth);
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor( private auth: Auth,) {
  }


  signIn(params: SingIn): Observable<any> {
    // this.firestore
    // return from( this.auth.signInWithEmailAndPassword(
    //   params.email, params.password
    // ));


     return from(signInWithEmailAndPassword(this.auth, params.email, params.password))
  }

}
