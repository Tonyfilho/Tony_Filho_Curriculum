import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment.prod';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { HttpAuthenticationInterceptorService } from './pages/signin/services/http-authentication-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {  provide:  HTTP_INTERCEPTORS, useClass: HttpAuthenticationInterceptorService, multi: true  },
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())


  ]
};
