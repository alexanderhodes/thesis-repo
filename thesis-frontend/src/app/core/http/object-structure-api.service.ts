import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IObjectStructure} from '../../shared/interfaces';

@Injectable()
export class ObjectStructureApiService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IObjectStructure[]> {
    return this.httpClient.get<IObjectStructure[]>('object-structure');
  }

  getObjectStructuresByObject(objectName: string): Observable<IObjectStructure[]> {
    return this.httpClient.get<IObjectStructure[]>(`object-structure/${objectName}`);
  }

  getObjectStructure(id: string): Observable<IObjectStructure> {
    return this.httpClient.get<IObjectStructure>(`object-structure/${id}`);
  }

  createObjectStructure(objectStructure: IObjectStructure): Observable<IObjectStructure> {
    return this.httpClient.post<IObjectStructure>('object-structure', objectStructure);
  }

  updateObjectStructure(id: string, objectStructure: IObjectStructure): Observable<IObjectStructure> {
    return this.httpClient.put<IObjectStructure>(`object-structure/${id}`, objectStructure);
  }

  deleteObjectStructure(id: string): Observable<any> {
    return this.httpClient.delete(`object-structure/${id}`);
  }

}
