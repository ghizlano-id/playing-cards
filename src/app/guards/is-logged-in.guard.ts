import { catchError, map } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(loginService.user() == undefined){
    loginService.getUser().pipe(
      map( _ => {
        return true;
      }),
      catchError(_ => router.navigate(['/login']))
    )
  }

  if(loginService.user() == null){
    router.navigate(['/login']);
  }

  return true;
};
