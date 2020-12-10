import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asset, AssetTransaction, KeyPair, Transaction, TransactionType} from '../../shared';
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

  getTransactionsForAsset(namespace: string, uuid: string): Observable<AssetTransaction[]> {
    console.log('getTransactionsForAsset', namespace, uuid);
    return this.httpClient.get<AssetTransaction[]>(`transactions/${namespace}/${uuid}`);
  }

}
