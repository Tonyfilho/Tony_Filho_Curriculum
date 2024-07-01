import { Component, inject } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  route = inject(Router);



  goBack() {
    this.route.navigateByUrl("/")

  }


}
