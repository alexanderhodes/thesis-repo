import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {StateService} from '../services';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private stateService: StateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
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

}
