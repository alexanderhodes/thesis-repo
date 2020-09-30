import {HttpModule, Module} from '@nestjs/common';
import {AppConfigModule} from '../app-config';
import {AssetsController, TransactionsController} from './controllers';
import {AssetsService, BigchainBaseService, BlocksService, TransactionsService} from './services';
import {MongooseModule} from '@nestjs/mongoose';
import {Assets, AssetSchema, Blocks, BlocksSchema, Transactions, TransactionsSchema} from './models';

const controllers = [
    AssetsController,
    TransactionsController
];
const services = [
    AssetsService,
    BigchainBaseService,
    BlocksService,
    TransactionsService
];

@Module({
    imports: [
        AppConfigModule,
        HttpModule,
        MongooseModule.forFeature([
            { name: Assets.name, schema: AssetSchema },
            { name: Blocks.name, schema: BlocksSchema },
            { name: Transactions.name, schema: TransactionsSchema }
        ]),
    ],
    controllers: [
        ...controllers
    ],
    exports: [
        ...services
    ],
    providers: [
        ...services
    ]
})
export class BigchainModule {

}
