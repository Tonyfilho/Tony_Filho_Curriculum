import { inject, Injectable, signal, } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogSlowComponent } from "./dialog-slow/dialog-slow.component";
import { DialogPopUpComponent } from "./dialog-pop-up/dialog-pop-up.component";
import { DialogGdprComponent } from "./dialog-gdpr/dialog-gdpr.component";



@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);
  sigNalId = signal<string | null>(null);

  openDialogRegistration = (enterAnimationDuration: string, exitAnimationDuration: string) => {
    this.dialog.open(DialogSlowComponent, {
      height: 'max-content',
      width: 'max-content',
      enterAnimationDuration,
      exitAnimationDuration,
    });

  }
  openDialogSucess = () => {
    this.dialog.open(DialogPopUpComponent, {
      width: '30vw',
      height: '20vw',
    });

  }


  openDialogRegistrationGDPR = () => {
  this.dialog.open(DialogGdprComponent, {
    width: 'max-content',
    height: 'max-content',
    enterAnimationDuration: '3000ms',
    exitAnimationDuration:  '1500ms'
  });


  }




}
