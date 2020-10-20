import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TransactionsService} from '../services';
import {IAsset} from '../interfaces';

@Controller('transactions')
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) {}

    @Get()
    getAllTransactions() {
        return this.transactionsService.find();
    }

    // @Post(":transaction")
    // createTransaction(@Body() asset: IAsset, @Param("transaction") ) {
    //
    //     return this.transactionsService.createTransaction(asset);
    // }

    @Get(":transaction")
    getTransaction(@Param("transaction") transaction: string) {
        return this.transactionsService.getTransaction(transaction);
    }

}
