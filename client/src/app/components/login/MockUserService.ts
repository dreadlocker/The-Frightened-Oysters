

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ILoginUser } from './../../models/ILoginUser';
import { IError } from './../../models/IError';

export class MockUserService {
    public static errorMessage = 'Error - Invalid credentials';

    public login(user: ILoginUser): Observable<any> {
      const obsv = Observable.create((observer: Observer<any>) => {
        const errorObj: IError = {
          type: 'auth.invalidCredentials',
          message: MockUserService.errorMessage
        };
        observer.error(errorObj);
        observer.complete();
    });

    return obsv;
    }
}
