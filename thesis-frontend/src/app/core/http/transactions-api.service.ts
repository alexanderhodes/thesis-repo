import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asset, KeyPair, Transaction, TransactionType} from '../../shared';
import {BigchainService} from '../services';

@Injectable()
export class TransactionsApiService {

  constructor(private httpClient: HttpClient,
              private bigchainService: BigchainService) {
  }

  createTransaction(asset: Asset, keyPair: KeyPair, transactionType: TransactionType): Observable<Transaction> {
    const transaction: Transaction = this.bigchainService.createTransaction(asset, keyPair, transactionType);
    console.log('transaction', transaction);
    return this.httpClient.post<Transaction>(`transactions`, transaction);
  }

}
