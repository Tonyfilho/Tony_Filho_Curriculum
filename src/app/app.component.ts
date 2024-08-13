
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';



import { AuthenticationService } from './_services/authentication.service';
import { UnSubscription } from './_share/UnSubscription';


type SingIn = {
  email: string;
  password?: string;
  userName?: string
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  extends UnSubscription implements OnInit {
  authService = inject(AuthenticationService);


 constructor() {
 super()

 }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        const localUser: SingIn = { email: user?.email!, password: '', userName: user?.displayName! };
        this.authService.currentUserSig.set(localUser);
      } else {

        this.authService.currentUserSig.set(null);

      }
      console.log("appUser: ", this.authService.currentUserSig())
    });
  }

}
