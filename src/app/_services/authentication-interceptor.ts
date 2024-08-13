import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { of, switchMap, take } from "rxjs";
import { AuthenticationService } from "./authentication.service";


/**
  * OBS: Quando usamos o AngularFire não precisa criar Interceptor, somente é criado quando usamos serviços HttpClient, o
  * AngularFire já faz.
  * Se usarmos o Firebase te,ps que fazer o Interceptor
  */

export const interceptorFN: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  // console.log('Interceptor chamado');

  // return authService.tokenResponse$.pipe(
  //   take(1),
  //   switchMap(token => {
  //     console.log('Token recebido:', token);
  //     if (!token) {
  //       return next(req);
  //     }
  //     const modifiedHeader = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token.idToken}`
  //       }
  //     });
  //     console.log('Requisição modificada:', modifiedHeader);
  //     return next(modifiedHeader);
  //   })
  // );
  return of();

}

