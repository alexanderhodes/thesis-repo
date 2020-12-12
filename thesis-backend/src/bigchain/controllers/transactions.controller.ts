import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../../authorization';
import {RelationDto, TransactionDto} from '../dtos';
import {GraphService} from '../../graph';
import {TransactionsService} from '../services';
import {AssetTransaction, ITransaction} from '../../shared';

@ApiTags("transactions")
@Controller("transactions")
export class TransactionsController {

    constructor(private transactionsService: TransactionsService,
                private neo4jService: GraphService) {
    }

    @Get()
    getAllTransactions(): Promise<any> {
        return this.transactionsService.find();
    }

    @Get(":namespace/:assetUuid")
    getTransactionsForAsset(@Param("assetUuid") asset: string, @Param("namespace") namespace: string): Promise<AssetTransaction[]> {
        return this.transactionsService.getTransactionsForAsset(asset, namespace);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTransaction(@Body() transaction: TransactionDto): Promise<ITransaction> {
        const transactionResult = await this.transactionsService.createTransaction(transaction);
        console.log('transaction', transaction.asset);
        const asset = transaction.asset.data;

        if (asset.namespace === 'relation') {
            // relation has to be created
            const relation = transaction.asset.data as RelationDto;
            const result = await (transaction.metadata.transactionType === 'create' ?
                this.neo4jService.createRelation(relation.data) : ( transaction.metadata.transactionType === 'update' ?
                    this.neo4jService.updateRelation(relation.data) : this.neo4jService.deleteRelation(relation.data)));
            const success = result.summary.counters.updates();
            console.log('success', success['relationshipsCreated:'] === 1);
        } else {
            // node has to be created or updated
            const result = await (transaction.metadata.transactionType === 'create' ?
                this.neo4jService.createNode(asset) : this.neo4jService.updateNode(asset));
            const success = result.summary.counters.updates();
            console.log('success', success['nodesCreated'] === 1);
        }

        return transactionResult;
    }

}
