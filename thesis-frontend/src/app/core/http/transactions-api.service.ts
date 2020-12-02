import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BigchainService} from '../../shared/services';
import {Asset, KeyPair, Occupation, Qualification, Transaction} from '../../shared/interfaces';

@Injectable()
export class TransactionsApiService {

  constructor(private httpClient: HttpClient,
              private bigchainService: BigchainService) {
  }

  createTransaction(asset: Asset, keyPair: KeyPair): Observable<Transaction> {
    const transaction: Transaction = this.bigchainService.createTransaction(asset, keyPair);
    console.log('transaction', transaction);
    return this.httpClient.post<Transaction>(`transactions`, transaction);
  }

}
