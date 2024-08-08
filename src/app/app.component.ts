
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './body/footer/footer.component';

import { MainComponent } from './body/main/main.component';
import { AuthenticationService } from './_services/authentication.service';
import { HeaderComponent } from './body/header/header.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MainComponent, HeaderComponent, FooterComponent
 ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private auth: AuthenticationService) {
  }



  ngOnInit(): void {
    this.auth.autoLogin();

  }

}
