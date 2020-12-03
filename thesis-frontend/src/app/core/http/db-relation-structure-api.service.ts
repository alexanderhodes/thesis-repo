import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DbRelationStructure, UpdateRelationStructure, UpdateRelationStructureResponse} from '../../shared/interfaces';

@Injectable()
export class DbRelationStructureApiService {

  constructor(private httpClient: HttpClient) {}

  createRelationStructures(relations: DbRelationStructure[]): Observable<DbRelationStructure[]> {
    return this.httpClient.post<DbRelationStructure[]>('relation-structure', relations);
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

  updateRelationStructure(id: string, relation: DbRelationStructure): Observable<DbRelationStructure> {
    return this.httpClient.put<DbRelationStructure>(`relation-structure/${id}`, relation);
  }

  updateRelationStructures(relationStructures: UpdateRelationStructure[]): Observable<UpdateRelationStructureResponse[]> {
    return this.httpClient.put<UpdateRelationStructureResponse[]>(`relation-structure`, relationStructures);
  }

  deleteRelationStructure(id: string): Observable<any> {
    return this.httpClient.delete<any>(`relation-structure/${id}`);
  }

}
