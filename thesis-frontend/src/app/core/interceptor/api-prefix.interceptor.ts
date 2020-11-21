import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  readonly #apiPrefix: string;

  constructor() {
    this.#apiPrefix = environment.apiUrl;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do nothing for assets requests
    if (req.url.indexOf('assets/i18n') > 0) {
      return next.handle(req);
    }

    const updatedRequest = req.clone({
      url: `${this.#apiPrefix}/${req.url}`
    });
    return next.handle(updatedRequest);
  }

}
