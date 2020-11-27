import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ConfigService, StateService} from '../services';
import {BaseInterceptor} from './base.interceptor';

@Injectable()
export class HttpErrorInterceptor extends BaseInterceptor implements HttpInterceptor {

  constructor(configService: ConfigService,
              private router: Router,
              private stateService: StateService) {
    super(configService);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do nothing for non api requests
    if (this.isNonApiPattern(req.url)) {
      return next.handle(req);
    }

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
