import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../../authorization';
import {RelationDto, TransactionDto} from '../dtos';
import {GraphService} from '../../graph';
import {TransactionsService} from '../services';
import {ITransaction} from '../../shared';

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

    @Get("asset/:asset")
    getTransactionsForAsset(@Param("asset") asset): Promise<any> {
        return this.transactionsService.listTransactions(asset);
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
            const result = await this.neo4jService.createRelation(relation.data);
            const success = result.summary.counters.updates();
            console.log('success', success['relationshipsCreated:'] === 1);
        } else {
            // node hast to be created
            const result = await this.neo4jService.createNode(asset);
            const success = result.summary.counters.updates();
            console.log('success', success['nodesCreated'] === 1);
        }

        return transactionResult;
    }

//    @UseGuards(JwtAuthGuard)
//    @Patch(":privateKey")
//    transferTransaction(@Request() req,
//                        @Body() transaction: any,
//                        @Param("privateKey") privateKey) {
//        const user = req.user;
//        if (user) {
//            const metaData: IMetadata = {
//                'time': Date.now(),
//                'pk': privateKey,
//                'user': user
//            };
//            return this.transactionsService.updateTransaction(transaction, user, privateKey, metaData);
//        }
//        return HttpStatus.BAD_REQUEST;
//    }

}
