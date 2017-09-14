import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrdersServiceService } from './orders-service.service';

@Injectable()
export class OrdersResolverService implements Resolve<any> {

  constructor(private ordersServiceService: OrdersServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.ordersServiceService.getAll();
  }

}
