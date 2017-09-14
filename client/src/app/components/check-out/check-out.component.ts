import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProduct } from './../../models/IProduct';
import { IError } from './../../models/IError';
import { ICheckOut } from './../../models/ICheckOut';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  public errorMessage: string;
  public cartProducts: IProduct[];
  public totalPrice = 0;

  // Form field
  public name: FormControl;
  public phone: FormControl;
  public address: FormControl;
  public email: FormControl;

  public checkOutForm: FormGroup;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.fetchCartProducts();
    this.buildLoginFormsData();
  }

  fetchCartProducts() {
    this.cartProducts = this.cartService.getProducts();
    this.totalPrice = this.cartProducts.reduce((prevValue: number, currentValue: IProduct) => {
      return prevValue + +currentValue.price;
    }, 0);
  }

  buildLoginFormsData() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]);

    this.phone = new FormControl('', [
      Validators.required
    ]);

    this.address = new FormControl('', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(150)
    ]);

    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.checkOutForm = new FormGroup({
      name: this.name,
      phone: this.phone,
      address: this.address,
      email: this.email
    });
  }

  order(orderData) {
    const order = {
      productIds: this.cartProducts.map(product => product.id),
      name: orderData.name,
      phone: orderData.phone,
      address: orderData.address,
      email: orderData.email,
      payment: 'cash'
    };

    const handleSuccessResponse = () => {
      this.errorMessage = undefined;
      this.cartService.clearCart();
      this.router.navigate(['cart', 'success']);
    };

    const handleError = (error: IError) => {
      this.errorMessage = error.message;
    };

    this.cartService.placeOrder(order)
      .subscribe(handleSuccessResponse, handleError);
  }

}
