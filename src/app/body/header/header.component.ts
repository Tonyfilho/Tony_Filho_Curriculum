import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AvatarComponent } from '../components/avatar/avatar.component';
import { AuthenticationService } from './../../pages/signin/services/authentication.service';
import { UnSubscription } from '../../_share/UnSubscription';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, AvatarComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends UnSubscription {
  localLogin$!: Observable<boolean>;



  constructor(private auth: AuthenticationService) {
    super();
    this.auth.isLoginAuthorization$.subscribe(authentication => this.localLogin$ = new Observable(d => d.next(authentication)));


  }


  logout() {
    this.localLogin$ = new Observable(d => d.next(false));
    this.auth.logOut();
  }

}
