import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment.prod';

import {  HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { interceptorFN } from './services/authentication-interceptor';
import { HttpAuthenticationInterceptorService } from './services/http-authentication-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(withInterceptorsFromDi()),
    {  provide:  HTTP_INTERCEPTORS, useClass: HttpAuthenticationInterceptorService, multi: true  },

    provideHttpClient(withInterceptors([interceptorFN])),

    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())


  ]
};
