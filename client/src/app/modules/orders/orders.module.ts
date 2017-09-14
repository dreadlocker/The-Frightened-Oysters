import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../modules/shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';

import { OordersListComponent} from '../../components/orders/history/list/list.component';
import { OrderDetailsComponent } from '../../components/orders/history/details/details.component';
import { ListOrderElementComponent } from '../../components/orders/history/list-order-element/list-order-element.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    OordersListComponent,
    OrderDetailsComponent,
    ListOrderElementComponent
  ]
})
export class OrdersModule { }
