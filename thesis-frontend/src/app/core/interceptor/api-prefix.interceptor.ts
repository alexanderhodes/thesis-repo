import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigService} from '../services';
import {BaseInterceptor} from './base.interceptor';

@Injectable()
export class ApiPrefixInterceptor extends BaseInterceptor implements HttpInterceptor {

  readonly #apiPrefix: string;

  constructor(configService: ConfigService) {
    super(configService);
    this.#apiPrefix = this.configService.getConfig('apiUrl');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do nothing for non api requests
    if (this.isNonApiPattern(req.url)) {
      return next.handle(req);
    }
    // if (req.url.indexOf('.json') > 0) {
    //   return next.handle(req);
    // }

    const updatedRequest = req.clone({
      url: `${this.#apiPrefix}/${req.url}`
    });
    return next.handle(updatedRequest);
  }

}
