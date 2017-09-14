import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuardService } from '../../services/guards/logged-guard.service';
import { OrdersResolverService } from '../../services/orders-resolver.service';

import { OordersListComponent} from '../../components/orders/history/list/list.component';
import { OrderDetailsComponent } from '../../components/orders/history/details/details.component';

const routes: Routes = [
    { path: '',
        component: OordersListComponent,
        canActivate: [LoggedGuardService],
        resolve: { 'orders': OrdersResolverService }
    },
    { path: ':id',
        component: OrderDetailsComponent,
        canActivate: [LoggedGuardService]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
