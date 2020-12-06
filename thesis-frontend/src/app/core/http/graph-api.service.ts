import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GraphObject, GraphQuery, GraphRelationQuery} from '../../shared';

@Injectable()
export class GraphApiService {

  constructor(private httpClient: HttpClient) {}

  getResourcesByType(type: string): Observable<GraphObject[]> {
    return this.httpClient.get<GraphObject[]>(`graph/node/${type}`);
  }

  getNodesByQuery(type: string, query: GraphQuery): Observable<GraphObject[]> {
    return this.httpClient.post<GraphObject[]>(`graph/node/${type}`, query);
  }

  getRelationsByQuery(query: GraphRelationQuery): Observable<GraphObject[]> {
    return this.httpClient.post<GraphObject[]>('graph/relation/read', query);
  }

}
