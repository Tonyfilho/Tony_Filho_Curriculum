import { HttpInterceptorFn, HttpParams } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { exhaustMap, take } from "rxjs";

export const interceptorFN: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  return authService.tokenResponse$.pipe(take(1), exhaustMap(token => {
    console.log("dentro do interceptor");
    if (!token) {
      return next(req);
     }
     const modifiedHeader = req.clone({
      params: new HttpParams().set('auth', token.idToken)
     })
     return next(modifiedHeader);
  }));

}

