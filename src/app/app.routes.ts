

import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { BodyComponent } from './components/body.component';
import { routesUserGuard } from './_services/routes-user.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'body', pathMatch: 'full' },
  { path: "body", component: BodyComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "about", loadComponent: () => import('./pages/about/about.component').then(c => c.AboutComponent) },
  { path: "autentication", loadComponent: () => import('./pages/signin/signin.component').then(c => c.SigninComponent)},
  { path: "register", loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent)},
  { path: "recouver", loadComponent: () => import('./pages/recouver/recouver.component').then(c => c.RecouverComponent)},
  { path:"home", loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),  canActivate: [routesUserGuard],},
  { path: '**', redirectTo: () => { return '/not-found' } },

];
