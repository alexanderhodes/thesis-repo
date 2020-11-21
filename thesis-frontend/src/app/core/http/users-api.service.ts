import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreatedUser, CreateUser, GenerateKeyPairResponse, UpdateUserPassword, User} from '../../shared';

@Injectable()
export class UsersApiService {

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('users');
  }

  createUser(user: CreateUser): Observable<CreatedUser> {
    return this.httpClient.post<CreatedUser>('users', user);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`users/${id}`);
  }

  updatePassword(userWithPassword: UpdateUserPassword): Observable<any> {
    return this.httpClient.post('authentication-functions/change-password', userWithPassword);
  }

  generateNewKeyPair(userId: string): Observable<GenerateKeyPairResponse> {
    return this.httpClient.post<GenerateKeyPairResponse>(`authentication-functions/generate-keypair/${userId}`, {});
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(`users/${id}`);
  }

}
