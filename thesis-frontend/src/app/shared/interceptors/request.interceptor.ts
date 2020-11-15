import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {StateService, STORAGE_USER} from '../services/public-api';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  #api: string;
  #authToken: string;
//  #methodsWithChange: string[] = ['POST', 'PUT', 'PATCH'];

  constructor(private router: Router,
              private stateService: StateService) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userStorage = this.stateService.getItem(STORAGE_USER);
    this.#api = environment.apiUrl;
    this.#authToken = userStorage ? userStorage.accessToken : null;

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
        if (error && (error.status === 401 || error.status === 403)) {
          // user is unauthorized and has to be logged out
          this.stateService.clear();
          this.router.navigate(['/login']).then();
        }
        return throwError(error);
      })
    );
  }

  handleResponseWithToken(event: HttpEvent<any>): void {
    if (event['body'] && event['body'].accessToken) {
      // store response from login in local storage as json object
      this.stateService.setItem(STORAGE_USER, event['body']);
    }
  }

}
