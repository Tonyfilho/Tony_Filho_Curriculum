import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { switchMap, take } from "rxjs";
import { AuthenticationService } from "./authentication.service";

export const interceptorFN: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
 

  //return authService.tokenResponse$.pipe(take(1), exhaustMap(token => {
 // return authService.tokenResponse$.pipe(take(1),switchMap(token => {
  //   console.log("dentro do interceptor", token?.localId);
  //   if (!token) {
  //     return next(req);
  //    }
  //    const modifiedHeader = req.clone({
  //    // params: new HttpParams().set('auth', token.idToken)
  //    setHeaders: {
  //     Authorization:`Bearer ${token.idToken}`
  //   }
  //    })
  //    return next(modifiedHeader);
  // }));


  console.log('Interceptor chamado');

  return authService.tokenResponse$.pipe(
    take(1),
    switchMap(token => {
      console.log('Token recebido:', token);
      if (!token) {
        return next(req);
      }
      const modifiedHeader = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.idToken}`
        }
      });
      console.log('Requisição modificada:', modifiedHeader);
      return next(modifiedHeader);
    })
  );


}

