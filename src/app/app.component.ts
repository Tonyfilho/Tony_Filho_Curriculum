import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './body/footer/footer.component';
import { HeaderComponent } from './body/header/header.component';
import { MainComponent } from './body/main/main.component';
import { AppSharedModule } from './app.share.module';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, MainComponent, HeaderComponent, FooterComponent, AppSharedModule
 ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
