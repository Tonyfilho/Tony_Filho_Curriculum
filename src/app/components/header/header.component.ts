import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { DialogService } from '../../_share/pop-up/dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, AvatarComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authentication = inject(AuthenticationService);
  dialogService = inject(DialogService);





  logout() {
    this.authentication.logOut();
  }


  openDialogRGPD() {
       this.dialogService.openDialogRegistrationGDPR();
  }

}
