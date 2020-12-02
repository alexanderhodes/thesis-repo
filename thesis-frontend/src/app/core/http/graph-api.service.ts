import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GraphObject, GraphQuery} from '../../shared/interfaces';

@Injectable()
export class GraphApiService {

  constructor(private httpClient: HttpClient) {}

  getResourcesByType(type: string): Observable<GraphObject[]> {
    return this.httpClient.get<GraphObject[]>(`graph/node/${type}`);
  }

  getNodesByQuery(type: string, query: GraphQuery): Observable<GraphObject[]> {
    return this.httpClient.post<GraphObject[]>(`graph/node/${type}`, query);
  }

}
