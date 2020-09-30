import {Controller, Get} from '@nestjs/common';
import {TransactionsService} from '../../bigchain/services';

@Controller("api/transactions")
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) {}

    @Get()
    getAllTransactions(): Promise<any> {
        return this.transactionsService.find();
    }

}
