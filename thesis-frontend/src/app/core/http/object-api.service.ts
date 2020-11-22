import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IObject} from '../../shared/interfaces';

@Injectable()
export class ObjectApiService {

  constructor(private httpClient: HttpClient) {}

  getAllObjects(): Observable<IObject[]> {
    return this.httpClient.get<IObject[]>('configuration/objects');
  }

  getObjectByName(name: string): Observable<IObject> {
    return this.httpClient.get<IObject>(`configuration/objects/${name}`);
  }

  createObject(object: IObject): Observable<IObject> {
    return this.httpClient.post<IObject>('configuration/objects', object);
  }

  updateObject(name: string, object: IObject): Observable<IObject> {
    return this.httpClient.put<IObject>(`configuration/objects/${name}`, object);
  }

  deleteObject(name: string): Observable<any> {
    return this.httpClient.delete(`configuration/objects/${name}`);
  }
}
