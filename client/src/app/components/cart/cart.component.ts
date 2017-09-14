import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HelperServiceService } from '../../services/helper-service.service';

import { IProduct } from './../../models/IProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartProducts: IProduct[];
  public cartProductsOdd: IProduct[];
  public cartProductsEven: IProduct[];
  public totalPrice = 0;
  constructor(private cartService: CartService, private helperServiceService: HelperServiceService) {
    this.cartProductsOdd = [];
    this.cartProductsEven = [];
  }

  ngOnInit() {
    this.fetchCartProducts();
  }

  fetchCartProducts() {
    this.cartProducts = this.cartService.getProducts();
    this.cartProductsEven = [];
    this.cartProductsOdd = [];
    this.helperServiceService.buildOddAndEvenElements(this.cartProducts, this.cartProductsOdd, this.cartProductsEven);
    this.totalPrice = this.cartProducts.reduce((prevValue: number, currentValue: IProduct) => {
      return prevValue + +currentValue.price;
    }, 0);
  }

  public removeProduct(product: IProduct) {
    this.cartService.removeProduct(product);
    this.fetchCartProducts();
  }
}
