import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar,) {

  }


  openSnackBar(millisecond: number, message: string) {
    this._snackBar.openFromComponent(SnackBarComponent,  {
      duration: millisecond,
      data: message,
      

    });
  }
}
