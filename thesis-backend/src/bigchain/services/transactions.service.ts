import {HttpService, Injectable} from '@nestjs/common';
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config/services';
import {IAsset, IMetaData, ITransaction} from '../interfaces';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Transactions} from '../models';
import {User} from '../../database/entities';

@Injectable()
export class TransactionsService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                @InjectModel(Transactions.name) private transactionsModel: Model<Transactions>) {
        super(configurationService, httpService);
    }

    async find(): Promise<Transactions[]> {
        return this.transactionsModel.find();
    }

    getTransaction(transactionId: string): Promise<ITransaction> {
        return this.getConnection().getTransaction(transactionId);
    }

    listTransactions(assetId: string): Promise<ITransaction> {
        return this.getConnection().listTransactions(assetId);
    }

    createTransaction(asset: IAsset, user: User, privateKey: string, metadata: IMetaData = null): Promise<ITransaction> {
        // Create a new keypair.
//        const alice = new this.driver.Ed25519Keypair();
//        console.log('alice', alice);

        // Construct a transaction payload
        const tx = this.driver.Transaction.makeCreateTransaction(
            asset,
            metadata,
            // A transaction needs an output
            [
                this.driver.Transaction.makeOutput(this.driver.Transaction.makeEd25519Condition(user.publicKey))
            ],
            user.publicKey
        );

        // Sign the transaction with private keys
        const txSigned = this.driver.Transaction.signTransaction(tx, privateKey);
        // get connection to bigchaindb
        const connection = this.getConnection();
        // Send the transaction off to BigchainDB
        return connection.postTransactionCommit(txSigned)
            .then((retrievedTx: ITransaction) => {
                console.log('Transaction', retrievedTx.id, 'successfully posted.')
                return connection.getTransaction(retrievedTx.id);
            });
    }

    updateTransaction(createdTransaction: any, user: User, privateKey: string, metadata: IMetaData = null): Promise<ITransaction> {
        const tx = this.driver.Transaction.makeTransferTransaction(
            [{ tx: createdTransaction, output_index: 0 }],
            [
                this.driver.Transaction.makeOutput(this.driver.Transaction.makeEd25519Condition(user.publicKey))
            ],
            metadata
        );

        // Sign the transaction with private keys
        const txSigned = this.driver.Transaction.signTransaction(tx, privateKey);
        // get connection to bigchaindb
        const connection = this.getConnection();
        // Send the transaction off to BigchainDB
        return connection.postTransactionCommit(txSigned)
            .then((retrievedTx: ITransaction) => {
                console.log('Transaction', retrievedTx.id, 'successfully transfered.')
                return connection.getTransaction(retrievedTx.id);
            });
    }

}
