import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { switchMap, take } from "rxjs";
import { AuthenticationService } from "./authentication.service";

export const interceptorFN: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  console.log("dentro do interceptor");

  //return authService.tokenResponse$.pipe(take(1), exhaustMap(token => {
  return authService.tokenResponse$.pipe(take(2),switchMap(token => {
    console.log("dentro do interceptor", token?.localId);
    if (!token) {
      return next(req);
     }
     const modifiedHeader = req.clone({
     // params: new HttpParams().set('auth', token.idToken)
     setHeaders: {
      Authorization: token.idToken
    }
     })
     return next(modifiedHeader);
  }));



}

