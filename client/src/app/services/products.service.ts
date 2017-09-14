import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';

import { IProduct } from './../models/IProduct';
import { IError } from './../models/IError';
import { ICookie } from './../models/ICookie';

const remoteServerHost = 'http://localhost:9090/api';

@Injectable()
export class ProductsService {

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  getAll(): Observable<any> {
    return this.http
      .get(`${remoteServerHost}/products`)
      .map(res => {
        const parsedResponse = res.json();

        if (parsedResponse.error) {
          const errorObj = parsedResponse.error as IError;
          throw errorObj;
        } else {
          return parsedResponse as IProduct[];
        }
      });
  }

  getById(id): Observable<any> {
    return this.http
      .get(`${remoteServerHost}/products/${id}`)
      .map(res => {
        const parsedResponse = res.json();

        if (parsedResponse.error) {
          const errorObj = parsedResponse.error as IError;
          throw errorObj;
        } else {
          return parsedResponse as IProduct;
        }
      });
  }

  public update(productData: IProduct, id) {
    const headers = this.authenticationService.getAuthHeader();
    return this.http
      .put(`${remoteServerHost}/products/${id}`, productData, { headers })
      .map(res => {
        const parsedResponse = res.json();

        if (parsedResponse.error) {
          const errorObj = parsedResponse.error as IError;
          throw errorObj;
        } else {
          return parsedResponse as IProduct;
        }
      });
  }
  public add(productData: IProduct): Observable<any> {
    const headers = this.authenticationService.getAuthHeader();
    return this.http
      .post(`${remoteServerHost}/products`, productData,  { headers })
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
}
