import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Neo4jService {

  constructor(private httpClient: HttpClient) {}

  findAllEmployees(): Observable<any> {
    return this.httpClient.get('neo4j/employees');
  }

}
