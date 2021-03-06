import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permission} from '../../shared';

@Injectable()
export class PermissionsApiService {

  constructor(private httpClient: HttpClient) {}

  getPermissions(): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>('permissions');
  }

}
