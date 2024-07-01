import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AvatarComponent } from '../components/avatar/avatar.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, AvatarComponent,  RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  localLogin$!: Observable<boolean>;



  constructor () {
    this.localLogin$ = new Observable(d => d.next(false));

  }


  logout() {
    this.localLogin$ = new Observable(d => d.next(false));
  }

}
