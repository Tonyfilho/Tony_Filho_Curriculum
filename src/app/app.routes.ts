

import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BodyComponent } from './body/body.component';


export const routes: Routes = [
  { path: '', redirectTo: 'body', pathMatch: 'full' },
  { path: "about", loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent) },
  { path: "autentication", loadComponent: () => import('./pages/signin/signin.component').then(c => c.SigninComponent)},
  { path:"home", loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)},
  { path: "body", component: BodyComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: '**', redirectTo: () => { return '/not-found' } },

];
