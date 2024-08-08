import { Component } from '@angular/core';

import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-pop-up',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog-pop-up.component.html',
  styleUrl: './dialog-pop-up.component.scss'
})
export class DialogPopUpComponent {

}
