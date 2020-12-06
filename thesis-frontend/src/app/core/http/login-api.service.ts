import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginCredentials} from '../../shared';

@Injectable()
export class LoginApiService {

  constructor(private httpClient: HttpClient) {}

  login(loginCredentials: LoginCredentials): Observable<any> {
    return this.httpClient.post('authentication/login', loginCredentials);
  }

  loginSilent(): Observable<any> {
    return this.httpClient.post('authentication/login/silent', {});
  }

}
