import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreatedUser, CreateUser, User} from '../../shared';

@Injectable()
export class UsersApiService {

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.httpClient.get('api/users');
  }

  createUser(user: CreateUser): Observable<CreatedUser> {
    return this.httpClient.post<CreatedUser>('api/users', user);
  }

}
