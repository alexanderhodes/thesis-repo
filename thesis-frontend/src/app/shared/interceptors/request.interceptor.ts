import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  #api: string;
  #authToken: string;

  constructor() {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.#api = environment.apiUrl;

    const updatedRequest = this.#authToken ? req.clone({
      url: `${this.#api}/${req.url}`,
      headers: req.headers.append('Authorization', `Bearer ${this.#authToken}`)
    }) : req.clone({
      url: `${this.#api}/${req.url}`
    });

    return next.handle(updatedRequest);
  }

}
