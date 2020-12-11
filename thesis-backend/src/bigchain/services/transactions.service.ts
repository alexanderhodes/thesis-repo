import {HttpService, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BigchainBaseService} from './bigchain-base.service';
import {ConfigurationService} from '../../app-config';
import {TransactionModel} from '../models';
import {UserEntity} from '../../database';
import {AssetTransaction, IMetadata, ITransaction} from '../../shared';
import {AssetsService} from './assets.service';
import {MetadataService} from './metadata.service';

@Injectable()
export class TransactionsService extends BigchainBaseService {

    constructor(configurationService: ConfigurationService,
                httpService: HttpService,
                private assetsService: AssetsService,
                private metadataService: MetadataService,
                @InjectModel(TransactionModel.name) private transactionsModel: Model<TransactionModel>) {
        super(configurationService, httpService);
    }

    async find(): Promise<TransactionModel[]> {
        return this.transactionsModel.find();
    }

//     getTransactionByApi(transactionId: string): Promise<ITransaction> {
//         return this.getConnection().getTransaction(transactionId);
//     }

    async getTransactionByMongoDb(transactionId: string): Promise<TransactionModel> {
        return this.transactionsModel.findOne({"id": transactionId});
    }

    async getTransactionsForAsset(assetUuid: string, namespace: string): Promise<AssetTransaction[]> {
        const assets = await this.assetsService.findAllByUuidAndNamespace(assetUuid, namespace);
        const transactions: AssetTransaction[] = [];

        for (const asset of assets) {
            const transaction = await this.getTransactionByMongoDb(asset.id);
            const metadata = await this.metadataService.findById(transaction.id);
            if (transaction && metadata && metadata.metadata.asset) {
                transactions.push({
                    asset: metadata.metadata.asset,
                    metadata: metadata.metadata,
                    transaction: transaction
                });
            }
        }

        return transactions;
    }

    async listTransactions(assetUuid: string): Promise<ITransaction[]> {
        const assets = await this.assetsService.findAllByUuid(assetUuid);
        const transactions = [];

        for (const asset of assets) {
            const transaction = await this.getTransactionByMongoDb(asset.id);
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

}
