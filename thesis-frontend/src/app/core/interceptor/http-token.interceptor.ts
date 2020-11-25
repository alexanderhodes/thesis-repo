import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {StateService, STORAGE_USER} from '../services';
import {CleanUpHelper} from '../utils';

@Injectable()
export class HttpTokenInterceptor extends CleanUpHelper implements HttpInterceptor {

  #token: string;

  constructor(private stateService: StateService) {
    super();
    this.stateService.getItem$(STORAGE_USER)
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe(userStorage => {
      if (userStorage) {
        this.#token = userStorage.accessToken;
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do nothing for assets requests
    if (req.url.indexOf('assets/i18n') > 0) {
      return next.handle(req);
    }

    const updatedRequest = this.#token ? req.clone({
      headers: req.headers.append('Authorization', `Bearer ${this.#token}`)
    }) : req.clone();

    return next.handle(updatedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event['url'] && event['url'].indexOf('authentication/login') > 0 && event['status'] === 201) {
          this._handleResponseWithToken(event);
        }
        return event;
      })
    );
  }

  _handleResponseWithToken(event: HttpEvent<any>): void {
    if (event['body'] && event['body'].accessToken) {
      // store response from login in local storage as json object
      this.stateService.setItem(STORAGE_USER, event['body']);
    }
  }

}
