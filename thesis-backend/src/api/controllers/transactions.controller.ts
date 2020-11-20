import {Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Request, UseGuards} from '@nestjs/common';
import {TransactionsService} from '../../bigchain/services';
import {IAsset, IMetaData} from '../../bigchain/interfaces';
import {JwtAuthGuard} from '../../authorization/guards';

@Controller("transactions")
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) {}

    @Get()
    getAllTransactions(): Promise<any> {
        return this.transactionsService.find();
    }

    @Get()
    getTransactionsForAsset(@Query("asset") asset): Promise<any> {
        return this.transactionsService.listTransactions(asset);
    }

    @UseGuards(JwtAuthGuard)
    @Post(":privateKey")
    createTransaction(@Body() asset: IAsset,
                      @Param("privateKey") privateKey,
                      @Request() req) {
        const user = req.user;
        if (user) {
            console.log('user', user);
            const metaData: IMetaData = {
                'time': Date.now(),
                'pk': privateKey,
                'user': user
            };
            return this.transactionsService.createTransaction(asset, user, privateKey, metaData);
        }
        return HttpStatus.BAD_REQUEST;
    }

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
