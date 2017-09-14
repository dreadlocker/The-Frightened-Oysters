import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartRoutingModule } from './cart-routing.module';

import { CartComponent } from '../../components/cart/cart.component';
import { CheckOutComponent } from '../../components/check-out/check-out.component';
import { SuccessCheckOutComponent } from '../../components/success-check-out/success-check-out.component';

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CartComponent,
    CheckOutComponent,
    SuccessCheckOutComponent
  ]
})
export class CartModule { }
