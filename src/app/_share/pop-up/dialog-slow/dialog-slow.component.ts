import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogService } from '../dialog-slow.service';
import { Router } from '@angular/router';


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

      } else {
        this.route.navigateByUrl("/autentication");
      }
    });
  }



}
