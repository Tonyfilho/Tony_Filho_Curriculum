import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AvatarComponent } from '../../components/avatar/avatar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, AvatarComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authentication = inject(AuthenticationService);





  logout() {
    this.authentication.logOut();
  }

}
