import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getSession().pipe(
      map((session: any) => (session.role === 'employee' ? true : false)),
      tap((hasAdministrator) => {
        if (!hasAdministrator) {
          this.router.navigate(['/admin']);
        }
      })
    );
  }
}
