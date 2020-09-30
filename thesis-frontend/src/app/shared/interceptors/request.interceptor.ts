import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  #api = 'http://localhost:3000';

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const prefixedReq = req.clone({
      url: `${this.#api}/${req.url}`
    });
    return next.handle(prefixedReq);
  }

}
