import { inject, Injectable } from "@angular/core";
import { DialogSlowComponent } from "./dialog-slow.component";
import { MatDialog } from "@angular/material/dialog";



@Injectable({
  providedIn: 'root'
})
export class DialogSlowService {

 private readonly dialog = inject(MatDialog);

   openDialog = (enterAnimationDuration: string, exitAnimationDuration: string) => {
    this.dialog.open(DialogSlowComponent, {
      // width: '30vw',
      // height: '40px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

   }



}
