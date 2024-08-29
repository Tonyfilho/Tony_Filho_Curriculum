import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorSnackBarService {

  constructor(private _snackBar: MatSnackBar,) {

  }


  openErrorSnackBar(millisecond: number, message: string) {
    this._snackBar.openFromComponent(SnackBarComponent,  {
      duration: millisecond,
      data: message,


    });
  }
}
