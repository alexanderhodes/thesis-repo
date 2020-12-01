import {Injectable} from '@angular/core';
import * as driver from 'bigchaindb-driver';
import {Asset, KeyPair, Transaction} from '../interfaces';

@Injectable()
export class BigchainService {

  readonly #driver: any;

  constructor() {
    this.#driver = driver;
    console.log('driver', driver);
  }

  createTransaction(asset: Asset, keyPair: KeyPair): Transaction {
    const metadata = {
      time: Date.now()
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
