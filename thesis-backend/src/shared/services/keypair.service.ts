import {Injectable} from '@nestjs/common';
import driver = require('bigchaindb-driver');
import {IKeyPair} from '../interfaces';

@Injectable()
export class KeypairService {

    readonly #_driver: any;

    constructor() {
        this.#_driver = driver;
    }

    createKeyPair(): IKeyPair {
        return new driver.Ed25519Keypair();
    }

}
