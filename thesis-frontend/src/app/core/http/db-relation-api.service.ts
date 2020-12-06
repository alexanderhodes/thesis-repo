import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DbRelation} from '../../shared';

@Injectable()
export class DbRelationApiService {

  constructor(private httpClient: HttpClient) {}

  createRelation(relation: DbRelation): Observable<DbRelation> {
    return this.httpClient.post<DbRelation>('relations', relation);
  }

  findAll(): Observable<DbRelation[]> {
    return this.httpClient.get<DbRelation[]>('relations');
  }

  findOneRelationByName(name: string): Observable<DbRelation> {
    return this.httpClient.get<DbRelation>(`relations/${name}`);
  }

  updateRelation(name: string, relation: DbRelation): Observable<DbRelation> {
    return this.httpClient.put<DbRelation>(`relations/${name}`, relation);
  }

  deleteRelation(name: string): Observable<any> {
    return this.httpClient.delete<any>(`relations/${name}`);
  }

}
