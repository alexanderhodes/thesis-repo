import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  #api: string;
  #authToken: string;
//  #methodsWithChange: string[] = ['POST', 'PUT', 'PATCH'];

  constructor(private router: Router) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userStorage = localStorage.getItem('user');
    this.#api = environment.apiUrl;
    this.#authToken = userStorage ? JSON.parse(userStorage).accessToken : null;

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
      }),
      catchError((error: HttpResponse<any>) => {
        if (error && error.status === 401) {
          // user is unauthorized and has to be logged out
          localStorage.clear();
          this.router.navigate(['/login']).then();
        }
        return throwError(error);
      })
    );
  }

  handleResponseWithToken(event: HttpEvent<any>): void {
    if (event['body'] && event['body'].accessToken) {
      // store response from login in local storage as json object
      localStorage.setItem('user', JSON.stringify(event['body']));
    }
  }

}
