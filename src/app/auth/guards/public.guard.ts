import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  // const url = state.url;
  // localStorage.setItem('url', url)
  // console.log({ status: authService.authStatus() });

  if (authService.authStatus() === AuthStatus.authenticated) {
    return false;
  }



  return true;
};
