import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {


  localImg$!: Observable<string>;


  constructor () {

    this.localImg$ = new Observable((d: any ) => d == null ? d.next("") : d.next("./../../../../assets/images/login/no_avatar.png"))
  }

}
