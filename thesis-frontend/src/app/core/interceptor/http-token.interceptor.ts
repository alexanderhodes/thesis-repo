import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {ConfigService, StateService, STORAGE_USER} from '../services';
import {BaseInterceptor} from './base.interceptor';

@Injectable()
export class HttpTokenInterceptor extends BaseInterceptor implements HttpInterceptor {

  #token: string;

  constructor(configService: ConfigService,
              private stateService: StateService) {
    super(configService);
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
    // do nothing for non api requests
    if (this.isNonApiPattern(req.url)) {
      return next.handle(req);
    }
    // if (req.url.indexOf('assets/i18n') > 0) {
    //   return next.handle(req);
    // }

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
