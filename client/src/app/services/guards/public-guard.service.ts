import { Injectable } from '@angular/core';
import { AuthenticationService } from './../authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PublicGuardService implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserLogged = this.authenticationService.isUserLogged();
    if (isUserLogged) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }

}
