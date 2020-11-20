import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../interfaces/public-api';

@Injectable({
  providedIn: 'root'
})
export class RolesApiService {

  constructor(private httpClient: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>('roles');
  }
}
