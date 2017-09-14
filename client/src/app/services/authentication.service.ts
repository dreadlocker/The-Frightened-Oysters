import { ICookie } from './../models/ICookie';
import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { Headers } from '@angular/http';

const authCookieKey = 'x-cookie';
const authCookiePath = '/';

@Injectable()
export class AuthenticationService {
  public userLoggedEvent: EventEmitter<boolean>;

  constructor(private cookieService: CookieService) {
    this.userLoggedEvent = new EventEmitter();
  }

  public isUserLogged(): boolean {
    const authCookie = this.cookieService.get(authCookieKey);
    return !!authCookie;
  }

  public getAuthHeader(): Headers {
    const cookie = this.getAuthCookie();
    const headers = new Headers();
    headers.append(authCookieKey, cookie);
    return headers;
  }

  private getAuthCookie(): string {
    const authCookie = this.cookieService.get(authCookieKey);
    return authCookie;
  }

  public setLoginCookie(cookie: ICookie) {
    const expireDate = new Date(cookie.cookieExpirationTime);
    this.cookieService.set(authCookieKey, cookie.cookie, expireDate, authCookiePath);
    this.userLoggedEvent.emit(true);
  }

  public deleteLoginCookie() {
    this.cookieService.delete(authCookieKey, authCookiePath);
    this.userLoggedEvent.emit(true);
  }

}
