import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ng2-cookies';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IProduct } from './../models/IProduct';
import { ICheckOut } from './../models/ICheckOut';
import { IError } from './../models/IError';

const cartCookieKey = 'cart';
const cartCookiePath = '/';
const remoteServerHost = 'http://localhost:9090/api/orders';

@Injectable()
export class CartService {
  public cartUpdateEvent: EventEmitter<number>;
  constructor(private http: Http, private cookieService: CookieService) {
    this.cartUpdateEvent = new EventEmitter();
  }

  public getProducts() {
    const currentCartProductsAsString = this.cookieService.get(cartCookieKey);
    let cartProducts: IProduct[] = [];
    if (currentCartProductsAsString && currentCartProductsAsString.length > 0) {
      const parsedCartProduct = JSON.parse(currentCartProductsAsString);
      if (Array.isArray(parsedCartProduct)) {
        cartProducts = parsedCartProduct;
      }
    }
    return cartProducts;
  }

  public addProduct(product: IProduct) {
    const cartProducts = this.getProducts();
    cartProducts.push(product);
    this.updateCardCookie(cartProducts);
  }

  public removeProduct(product: IProduct) {
    let cartProducts = this.getProducts();
    cartProducts = cartProducts.filter(p => p.id !== product.id);
    this.updateCardCookie(cartProducts);
  }

  private updateCardCookie(cartProducts: IProduct[]) {
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.cookieService.set(cartCookieKey, JSON.stringify(cartProducts), tomorrow, cartCookiePath);
    this.cartUpdateEvent.emit(cartProducts.length);
  }

  public placeOrder(order: ICheckOut): Observable<any> {
    return this.http
    .post(remoteServerHost, order)
    .map(res => {
      const parsedResponse = res.json();

      if (parsedResponse.error) {
        const errorObj = parsedResponse.error as IError;
        throw errorObj;
      } else {
        return parsedResponse;
      }
    });
  }

  public clearCart() {
    this.updateCardCookie([]);
  }
}
