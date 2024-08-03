import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../pages/signin/services/authentication.service';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {



  localImg$!: Observable<string>;


  constructor (private authenticationService: AuthenticationService) {
    // this.localImg$ = authenticationService.avatarUser$ == null ? authenticationService.avatarUser$ : new Observable((d: any ) => d.next("./../../../../assets/images/login/no_avatar.png"));
     this.authenticationService.userCredential$.subscribe((img: UserCredential) => 
      this.localImg$ = new Observable(d =>  d.next(img?.user?.photoURL ?
      (img?.user?.photoURL as  string) : "./../../../../assets/images/login/no_avatar.png" )));
  }

}
