import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IOrder } from './../models/IOrder';
import { IError } from './../models/IError';

const remoteServerHost = 'http://localhost:9090/api/orders';

@Injectable()
export class OrdersServiceService {

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  getAll(): Observable<any> {
    const headers = this.authenticationService.getAuthHeader();
    return this.http
      .get(remoteServerHost, { headers })
      .map(res => {
        const parsedResponse = res.json();

        if (parsedResponse.error) {
          const errorObj = parsedResponse.error as IError;
          throw errorObj;
        } else {
          return parsedResponse as IOrder[];
        }
      });
  }

  getById(id): Observable<any> {
    const headers = this.authenticationService.getAuthHeader();
    return this.http
      .get(`${remoteServerHost}/${id}`, { headers })
      .map(res => {
        const parsedResponse = res.json();

        if (parsedResponse.error) {
          const errorObj = parsedResponse.error as IError;
          throw errorObj;
        } else {
          return parsedResponse as IOrder;
        }
      });
  }
}
