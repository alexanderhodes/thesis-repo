import {HttpService, Injectable} from '@nestjs/common';
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config/services';
import {IAsset, IMetaData, ITransaction} from '../interfaces';

@Injectable()
export class TransactionsService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService) {
        super(configurationService, httpService);
    }

    getAllTransactions() {
        return this.apiPath;
    }

    getTransaction(transactionId: string): Promise<ITransaction> {
        return this.getConnection().getTransaction(transactionId);
    }

    listTransactions(assetId: string): Promise<ITransaction> {
        return this.getConnection().listTransactions(assetId);
    }

    createTransaction(asset: IAsset, metadata: IMetaData = null): Promise<ITransaction> {
        // Create a new keypair.
        const alice = new this.driver.Ed25519Keypair();
        console.log('alice', alice);

        // Construct a transaction payload
        const tx = this.driver.Transaction.makeCreateTransaction(
            asset,
            metadata,
            // A transaction needs an output
            [
                this.driver.Transaction.makeOutput(this.driver.Transaction.makeEd25519Condition(alice.publicKey))
            ],
            alice.publicKey
        );

        // Sign the transaction with private keys
        const txSigned = this.driver.Transaction.signTransaction(tx, alice.privateKey);

        // Send the transaction off to BigchainDB
        const connection = this.getConnection();

        return connection.postTransactionCommit(txSigned)
            .then((retrievedTx: ITransaction) => {
                console.log('Transaction', retrievedTx.id, 'successfully posted.')
                return connection.getTransaction(retrievedTx.id);
            });
    }

}
