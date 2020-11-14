import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  #api: string;
  #authToken: string;
//  #methodsWithChange: string[] = ['POST', 'PUT', 'PATCH'];

  constructor() {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.#api = environment.apiUrl;

    const updatedRequest = this.#authToken ? req.clone({
      url: `${this.#api}/${req.url}`,
      headers: req.headers.append('Authorization', `Bearer ${this.#authToken}`)
    }) : req.clone({
      url: `${this.#api}/${req.url}`
    });
    // add content-type
    // if (updatedRequest.method) {
    //   updatedRequest = this.#methodsWithChange.find(updatedRequest.method.toUpperCase) ? req.clone({
    //     headers: updatedRequest.headers.append('Content-Type', 'application/json')
    //   }) : req.clone();
    // }

    return next.handle(updatedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event['url'] && event['url'].indexOf('auth/login') > 0 && event['status'] === 201) {
          this.handleResponseWithToken(event);
        }
        return event;
      })
    );
  }

  handleResponseWithToken(event: HttpEvent<any>): void {
    if (event['body'] && event['body'].access_token) {
      const accessToken = event['body'].access_token;
      console.log('access token received and has to be stored', accessToken);
    }
  }

}
