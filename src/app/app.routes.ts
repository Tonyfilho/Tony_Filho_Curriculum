

import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BodyComponent } from './body/body.component';


export const routes: Routes = [
  { path: '', redirectTo: 'body', pathMatch: 'full' },
  {path:"about", loadComponent: ()  => import('./pages/about/about.component').then(m => m.AboutComponent)},
  {path:"not-found", component: NotFoundComponent},
  {path:"body", component: BodyComponent},
  { path: '**', redirectTo: () => { return '/not-found'} },

];
