import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Asset, AssetWithContext} from '../../shared';
import {Observable} from 'rxjs';

@Injectable()
export class ApplicationApiService {

  constructor(private httpClient: HttpClient) {}

  getAsJsonLD(asset: Asset): Observable<AssetWithContext> {
    return this.httpClient.post<AssetWithContext>('function/transform', asset);
  }

}
