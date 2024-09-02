import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogService } from '../dialog-slow.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-gdpr',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-gdpr.component.html',
  styleUrl: './dialog-gdpr.component.scss'
})
export class DialogGdprComponent {

  dialogRef = inject(MatDialogRef<DialogGdprComponent>);
  dialigService = inject( DialogService);
  private route = inject(Router);



  ngOnInit(): void {

    this.dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.route.navigateByUrl("/autentication");
        this.dialogRef.close();

      } else {
        this.route.navigateByUrl("/body");
      }
    });
  }


}
