import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DbRelation, DbRelationStructure} from '../../shared/interfaces';

@Injectable()
export class DbRelationStructureApiService {

  constructor(private httpClient: HttpClient) {}

  createRelation(relation: DbRelation): Observable<DbRelationStructure> {
    return this.httpClient.post<DbRelationStructure>('relation-structure', relation);
  }

  findAll(): Observable<DbRelationStructure[]> {
    return this.httpClient.get<DbRelationStructure[]>('relation-structure');
  }

  findAllForRelation(relation: string): Observable<DbRelationStructure[]> {
    return this.httpClient.get<DbRelationStructure[]>(`relation-structure/relation/${relation}`);
  }

  findOneRelationStructure(id: string): Observable<DbRelationStructure> {
    return this.httpClient.get<DbRelationStructure>(`relation-structure/${id}`);
  }

  updateRelationStructure(id: string, relation: DbRelation): Observable<DbRelationStructure> {
    return this.httpClient.put<DbRelationStructure>(`relation-structure/${id}`, relation);
  }

  deleteRelationStructure(id: string): Observable<any> {
    return this.httpClient.delete<any>(`relation-structure/${id}`);
  }

}
