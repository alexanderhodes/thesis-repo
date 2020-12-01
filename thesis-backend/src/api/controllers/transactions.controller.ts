import {Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Request, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {TransactionsService} from '../../bigchain/services';
import {IAsset, IMetaData, ITransaction} from '../../bigchain/interfaces';
import {JwtAuthGuard} from '../../authorization/guards';
import {TransactionDto} from '../dtos';
import {Neo4jService} from '../../neo4j/services';

@ApiTags("transactions")
@Controller("transactions")
export class TransactionsController {

    constructor(private transactionsService: TransactionsService,
                private neo4jService: Neo4jService) {}

    @Get()
    getAllTransactions(): Promise<any> {
        return this.transactionsService.find();
    }

    @Get()
    getTransactionsForAsset(@Query("asset") asset): Promise<any> {
        return this.transactionsService.listTransactions(asset);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTransaction(@Body() transaction: TransactionDto): Promise<ITransaction> {
        const transactionResult = await this.transactionsService.createTransaction(transaction);
        console.log('transaction', transaction.asset);
        const result = await this.neo4jService.createNode(transaction.asset.data);
        const success = result.summary.counters.updates();
        console.log('success', success['nodesCreated'] === 1);
        return transactionResult;
    }

    // @UseGuards(JwtAuthGuard)
    // @Post(":privateKey")
    // createTransactionOld(@Body() asset: IAsset,
    //                      @Param("privateKey") privateKey,
    //                      @Request() req) {
    //     const user = req.user;
    //     if (user) {
    //         console.log('user', user);
    //         const metaData: IMetaData = {
    //             'time': Date.now(),
    //             'pk': privateKey,
    //             'user': user
    //         };
    //         return this.transactionsService.createTransactionOld(asset, user, privateKey, metaData);
    //     }
    //     return HttpStatus.BAD_REQUEST;
    // }

    @UseGuards(JwtAuthGuard)
    @Patch(":privateKey")
    transferTransaction(@Request() req,
                        @Body() transaction: any,
                        @Param("privateKey") privateKey) {
        const user = req.user;
        if (user) {
            const metaData: IMetaData = {
                'time': Date.now(),
                'pk': privateKey,
                'user': user
            };
            return this.transactionsService.updateTransaction(transaction, user, privateKey, metaData);
        }
        return HttpStatus.BAD_REQUEST;
    }

}
