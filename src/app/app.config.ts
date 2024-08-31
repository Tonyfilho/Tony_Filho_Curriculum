import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment.prod';


import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef,  } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
   //  provideHttpClient(withInterceptorsFromDi()),
   // {  provide:  HTTP_INTERCEPTORS, useClass: HttpAuthenticationInterceptorService, multi: true  },
   // provideHttpClient(withInterceptors([interceptorFN])),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {
      provide: MatDialogRef,
      useValue: {}
    },



  ]
};
