import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment.prod";
import { AngularFireAuthModule } from '@angular/fire/auth';




@NgModule({
  imports: [CommonModule, AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule ],
  exports: [AngularFireModule]
})
export class AppSharedModule {}
