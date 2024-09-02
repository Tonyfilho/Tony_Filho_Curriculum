import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const routesUserGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  let localLogin: boolean = false;

  authenticationService.user$.subscribe(hasUser => {
    if (hasUser) {
      return localLogin = true;
    }
    return localLogin;
  }
  );

  return localLogin;
};



export const routesGDPRGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);


  if (authenticationService.gdprAccessSig()) {
    return true
  }
  return false;


}
