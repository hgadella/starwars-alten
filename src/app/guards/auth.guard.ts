import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected router: Router, protected authService: AuthenticationService)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {
      return this.authService.isAuthenticated().then(isAuthenticated => {
        if (state.url !== '/login' && !isAuthenticated) {
          this.router.navigate(['/login'], {queryParams: {returnUrl : state.url}});
          return false;
        } else {
          return true;
        }
      }).catch(error => {
        return false;
      });
      /*const isAuthenticated = this.authService.isAuthenticated();
      console.log(isAuthenticated);
      if (this.authService.isAuthenticated()) {
        return true;
      } else {
        if (state.url !== '/login') {
          this.router.navigate(['/login'], {queryParams: {returnUrl : state.url}});
          return false;
        } else {
          return true;
        }
      }*/
    }
}
