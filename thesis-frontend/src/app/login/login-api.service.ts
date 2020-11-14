import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginCredentials} from './login.interface';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginApiService {

  constructor(private httpClient: HttpClient) {}

  login(loginCredentials: LoginCredentials): Observable<any> {
    return this.httpClient.post('auth/login', loginCredentials);
  }

}
