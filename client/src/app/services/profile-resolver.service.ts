import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from './users.service';

@Injectable()
export class ProfileResolverService implements Resolve<any> {

  constructor(private userService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getLogged();
  }

}
