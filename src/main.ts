import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withInterceptorsFromDi()),
//     {  provide:  HTTP_INTERCEPTORS, useClass: HttpAuthenticationInterceptorService, multi: true  },

//     provideHttpClient(withInterceptors([interceptorFN])),
//     provideRouter(routes),
//     provideAnimationsAsync(),
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore())


//   ]
// }).catch((err) => console.error(err));

