import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigService} from '../services';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  readonly #apiPrefix: string;

  constructor(private configService: ConfigService) {
    this.#apiPrefix = configService.getConfig('apiUrl');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do nothing for assets requests
    if (req.url.indexOf('.json') > 0) {
      return next.handle(req);
    }

    const updatedRequest = req.clone({
      url: `${this.#apiPrefix}/${req.url}`
    });
    return next.handle(updatedRequest);
  }

}
