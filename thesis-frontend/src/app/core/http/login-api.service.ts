import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginCredentials, ValidatePrivateKey} from '../../shared';

@Injectable()
export class LoginApiService {

  constructor(private httpClient: HttpClient) {}

  login(loginCredentials: LoginCredentials): Observable<any> {
    return this.httpClient.post('authentication/login', loginCredentials);
  }

  loginSilent(): Observable<any> {
    return this.httpClient.post('authentication/login/silent', {});
  }

  validatePrivateKey(body: ValidatePrivateKey): Observable<any> {
    return this.httpClient.post('authentication-functions/validate-private-key', body);
  }

}
