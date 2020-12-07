import {HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config';
import {Transactions} from '../models';
import {UserEntity} from '../../database';
import {IMetadata, ITransaction} from '../../shared';
import {AssetsService} from './assets.service';

@Injectable()
export class TransactionsService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                private assetsService: AssetsService,
                @InjectModel(Transactions.name) private transactionsModel: Model<Transactions>) {
        super(configurationService, httpService);
    }

    async find(): Promise<Transactions[]> {
        return this.transactionsModel.find();
    }

    getTransaction(transactionId: string): Promise<ITransaction> {
        return this.getConnection().getTransaction(transactionId);
    }

    async listTransactions(assetUuid: string): Promise<ITransaction[]> {
        const assets = await this.assetsService.findAllByUuid(assetUuid);
        const transactions = [];

        for (const asset of assets) {
            const transaction = await this.getTransaction(asset.id);
            transactions.push(transaction);
        }

        return transactions;
    }

    createTransaction(transaction: ITransaction): Promise<ITransaction> {
        // get connection to bigchaindb
        const connection = this.getConnection();
        // Send the transaction off to BigchainDB
        return connection.postTransactionCommit(transaction)
            .then((retrievedTx: ITransaction, err) => {
                console.log('err', err);
                return connection.getTransaction(retrievedTx.id);
            });
    }

    updateTransaction(createdTransaction: any, user: UserEntity, privateKey: string, metadata: IMetadata = null): Promise<ITransaction> {
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
