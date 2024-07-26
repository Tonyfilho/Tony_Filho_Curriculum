import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  template: `
  <div style="display: flex;  align-content: center;
    align-items: center;color: aliceblue; width:20vw; height: 12vh;
    background: linear-gradient(68.15deg, #583f33 14.62%, #eb1708 85.61%);">
      <p>Opsss something  wrong</p>
    </div>
    `,

})
export class SnackBarComponent {
  constructor(private _snackBar: MatSnackBar) { }


}
