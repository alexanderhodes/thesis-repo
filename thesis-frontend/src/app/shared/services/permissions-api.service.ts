import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permission} from '../interfaces/public-api';

@Injectable({
  providedIn: 'root'
})
export class PermissionsApiService {

  constructor(private httpClient: HttpClient) {}

  getPermissions(): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>('api/permissions');
  }

}
