import { IError } from './../models/IError';
import { ILoginUser } from './../models/ILoginUser';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IUser } from './../models/IUser';
import { ICookie } from './../models/ICookie';

const remoteServerHost = 'http://localhost:9090/api';
const remoteServerAuthHost = `${remoteServerHost}/auth`;

@Injectable()
export class UsersService {
  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  public login(user: ILoginUser): Observable<any> {
    return this.http
      .post(`${remoteServerAuthHost}/login`, user)
      .map(res => {
        const parsedResponse = res.json();

        if (parsedResponse.error) {
          const errorObj = parsedResponse.error as IError;
          throw errorObj;
        } else {
          const result = parsedResponse as ICookie;
          this.authenticationService.setLoginCookie(result);
          return result;
        }
      });
  }

  public logout() {
    const headers = this.authenticationService.getAuthHeader();
    return this.http
      .get(`${remoteServerAuthHost}/logout`, { headers })
      .map(res => {
        const parsedResponse = res.json();
        if (parsedResponse && parsedResponse.success) {
          this.authenticationService.deleteLoginCookie();
          return true;
        } else {
          throw new Error('Invalid logout');
        }
      });
  }

  public register(user: IUser): Observable<ICookie> {
    return this.http
      .post(`${remoteServerAuthHost}/register`, user)
      .map(res => {
        const parsedCookie = res.json() as ICookie;
        this.authenticationService.setLoginCookie(parsedCookie);
        return parsedCookie;
      });
  }

  public getLogged() {
    const headers = this.authenticationService.getAuthHeader();
    return this.http
      .get(`${remoteServerHost}/profile`, { headers })
      .map(res => {
        const parsedResponse = res.json();

        if (parsedResponse.error) {
          const errorObj = parsedResponse.error as IError;
          throw errorObj;
        } else {
          return parsedResponse as IUser;
        }
      });
  }

  public update(userData: IUser) {
    const headers = this.authenticationService.getAuthHeader();
    return this.http
      .put(`${remoteServerHost}/profile`, userData, { headers })
      .map(res => {
        const parsedResponse = res.json();

        if (parsedResponse.error) {
          const errorObj = parsedResponse.error as IError;
          throw errorObj;
        } else {
          return parsedResponse as IUser;
        }
      });
  }

}
