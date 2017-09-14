import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  cartProductsCounter = 0;
  public isUserLogged = false;

  constructor(private authenticationService: AuthenticationService, private cartService: CartService) {
    authenticationService.userLoggedEvent.subscribe(userLogged => {
      this.checkUserAuthentication();
    });
    cartService.cartUpdateEvent.subscribe(newCartProductsNUmber => {
      this.cartProductsCounter = newCartProductsNUmber;
    });
  }

  ngOnInit() {
    this.checkUserAuthentication();
    this.cartProductsCounter = this.cartService.getProducts().length;
  }

  checkUserAuthentication() {
    this.isUserLogged = this.authenticationService.isUserLogged();
  }

}
