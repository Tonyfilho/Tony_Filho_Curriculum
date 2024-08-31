import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogService } from '../dialog-slow.service';
import { DialogSlowService } from './dialog-slow.service';

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
  dialigService = inject( DialogSlowService);


  ngOnInit(): void {

    this.dialogRef.afterClosed().subscribe(result => {
      // this.dialigService.sigNalId.set(result);

      console.log(`fechou: ${result}`, ' ' , this.dialogRef.id);
    });


  }

  closeDialog = () => {
    this.dialogRef.close('CloseModal');
  }

}
