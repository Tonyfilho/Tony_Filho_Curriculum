import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from '../dialog.service';


@Component({
  selector: 'app-dialog-slow',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-slow.component.html',
  styleUrl: './dialog-slow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSlowComponent implements OnInit {
  dialogRef = inject(MatDialogRef<DialogSlowComponent>);
  dialigService = inject( DialogService);

  private route = inject(Router);



  ngOnInit(): void {

    this.dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.route.navigateByUrl("/register");
        this.dialogRef.close();

      } else {
        this.route.navigateByUrl("/autentication");
      }
    });
  }



}
