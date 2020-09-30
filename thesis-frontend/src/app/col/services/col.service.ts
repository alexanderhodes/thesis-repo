import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Col} from '../interfaces';

@Injectable()
export class ColService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Col[]> {
    return this.httpClient.get<Col[]>('cols');
  }

  createCol(col: Col): Observable<Col> {
    return this.httpClient.post<Col>('cols', col);
  }

}
