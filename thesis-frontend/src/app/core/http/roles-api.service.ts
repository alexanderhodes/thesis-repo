import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../../shared/interfaces';

@Injectable()
export class RolesApiService {

  constructor(private httpClient: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>('roles');
  }
}
