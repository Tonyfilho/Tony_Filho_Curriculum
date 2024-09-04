
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

export const routesUserGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  /**Com Observable
  authenticationService.user$.subscribe(hasUser => {
    if (hasUser) {
      return localLogin = true;
    }
    return localLogin;
  }
  );

  return localLogin;
*/

  if (authenticationService.isAuthUserSig()) {
    return true;
  }
  return false;
};



export const routesGDPRGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);


  if (authenticationService.gdprAccessSig()) {
    return true
  }
  return false;


}
