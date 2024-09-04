import { Component, inject, OnInit } from '@angular/core';

import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-dialog-pop-up',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog-pop-up.component.html',
  styleUrl: './dialog-pop-up.component.scss'
})
export class DialogPopUpComponent implements OnInit {

 private dialogRef = inject(MatDialogRef<DialogPopUpComponent>);
 private authenticationService = inject( AuthenticationService);
  private route = inject(Router);




  ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.authenticationService.isAuthUserSig.set(true);
       return  this.route.navigateByUrl('/body');
      } else {

       return this.route.navigateByUrl("/about");
      }

    });
  }

}
