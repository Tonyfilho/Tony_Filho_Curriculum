import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-success',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-success.component.html',
  styleUrl: './dialog-success.component.scss'
})
export class DialogSuccessComponent {

  dialogRef = inject(MatDialogRef<DialogSuccessComponent>);
  dialigService = inject( DialogService);

  private route = inject(Router);



  ngOnInit(): void {

    this.dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.route.navigateByUrl("/body");
        this.dialogRef.close();

      } else {
        this.route.navigateByUrl("/autentication");
      }
    });
  }

}
