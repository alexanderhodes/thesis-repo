import {Injectable} from '@angular/core';
import * as driver from 'bigchaindb-driver';
import {takeUntil} from 'rxjs/operators';
import {Asset, KeyPair, MetaData, StorageUser, Transaction} from '../../shared';
import {CleanUpHelper} from '../utils';
import {StateService, STORAGE_USER} from './state.service';

@Injectable()
export class BigchainService extends CleanUpHelper {

  readonly #driver: any;
  #username: string;

  constructor(private stateService: StateService) {
    super();
    this.#driver = driver;
    this.stateService.getItem$(STORAGE_USER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((user: StorageUser) => {
        this.#username = user ? user.username : '';
      });
  }

  createTransaction(asset: Asset, keyPair: KeyPair): Transaction {
    const metadata: MetaData = {
      timestamp: Date.now(),
      asset,
      data: '',
      transactionType: 'create',
      user: this.#username
    };
    // Construct a transaction payload
    const tx = this.#driver.Transaction.makeCreateTransaction(
      asset,
      metadata,
      // A transaction needs an output
      [
        this.#driver.Transaction.makeOutput(this.#driver.Transaction.makeEd25519Condition(keyPair.publicKey))
      ],
      keyPair.publicKey
    );

    // Sign the transaction with private keys
    return this.#driver.Transaction.signTransaction(tx, keyPair.privateKey);
  }

}
