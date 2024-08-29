import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel } from '@angular/material/snack-bar'

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  template: `
  <div style="display: flex;  align-content: center;
    align-items: center;color: aliceblue; width:25vw; height: 12vh;
    background: linear-gradient(68.15deg, #583f33 14.62%, #eb1708 85.61%);">
      <p style=" width: 100%; text-align: center;">{{ mensage }}</p>
    </div>
    `,

})
export class SnackBarComponent {
  mensage: string = "Are you sure has Authorization  ? ";
  constructor(private _snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.mensage = data;
  }




}
