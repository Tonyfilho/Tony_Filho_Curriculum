

import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BodyComponent } from './body/body.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';


export const routes: Routes = [
  { path: '', redirectTo: 'body', pathMatch: 'full' },
  { path: "body", component: BodyComponent },
  { path: "autentication", component: SigninComponent },
  { path: "not-found", component: NotFoundComponent },
  { path:"home", component: HomeComponent},
  { path: "about", component: AboutComponent },
  // { path: "about", loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent) },
  // { path: "autentication", loadComponent: () => import('./pages/signin/signin.component').then(c => c.SigninComponent)},
  // { path:"home", loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)},
  { path: '**', redirectTo: () => { return '/not-found' } },

];
