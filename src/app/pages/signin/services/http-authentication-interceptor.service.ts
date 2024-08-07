import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';
/**
 * 5º Reportar no Providers[...], nosso Interceptor, {
   provide: HTTP_INTERCEPTORS, useClass: HttpAuthenticationInterceptorService, multi: true
  }
 */

@Injectable({
  providedIn: 'root'
})
export class HttpAuthenticationInterceptorService implements HttpInterceptor {


  constructor(private auth: AuthenticationService) {


    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.tokenResponse$.pipe(take(1), exhaustMap(response => {
      console.log("tokenResponse$; ", response);
      if (!response) {
        console.log("No Response; ", response);
        return next.handle(req);
      }
      /**Clonando o request , pois original não pode ser SETADO, é IMUTÁVEL */
      const modifiedHeader = req.clone({
        params: new HttpParams().set('auth', response.idToken)

        // setHeaders: {
        //   Authorization: response.idToken
        // }
        /**Ou */
      });
      return next.handle(modifiedHeader);
    }));
  }


}
