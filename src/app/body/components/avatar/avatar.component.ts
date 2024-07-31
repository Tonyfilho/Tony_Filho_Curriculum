import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../pages/signin/services/authentication.service';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {


 
  localImg$: Observable<string>;


  constructor (private authenticationService: AuthenticationService) {


     this.localImg$ = authenticationService.avatarUser$ == null ? authenticationService.avatarUser$ : new Observable((d: any ) => d.next("./../../../../assets/images/login/no_avatar.png"));
  }

}
