import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from '../../components/cart/cart.component';
import { CheckOutComponent } from '../../components/check-out/check-out.component';
import { SuccessCheckOutComponent } from '../../components/success-check-out/success-check-out.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'success', component: SuccessCheckOutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
