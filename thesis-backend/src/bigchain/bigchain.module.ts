import {HttpModule, Module} from '@nestjs/common';
import {AppConfigModule} from '../app-config';
import {AssetsController, BlocksController, TransactionsController} from './controllers';
import {AssetsService, BigchainBaseService, BlocksService, MetadataService, TransactionsService} from './services';
import {MongooseModule} from '@nestjs/mongoose';
import {
    AssetModel,
    AssetSchema,
    BlockModel,
    BlocksSchema,
    MetadataModel,
    MetadataSchema,
    TransactionModel,
    TransactionsSchema
} from './models';
import {AuthorizationModule} from '../authorization';
import {GraphModule} from '../graph';

const controllers = [
    AssetsController,
    BlocksController,
    TransactionsController
];
const services = [
    AssetsService,
    BigchainBaseService,
    BlocksService,
    MetadataService,
    TransactionsService
];

@Module({
    imports: [
        AppConfigModule,
        AuthorizationModule,
        GraphModule,
        HttpModule,
        MongooseModule.forFeature([
            { name: AssetModel.name, schema: AssetSchema },
            { name: BlockModel.name, schema: BlocksSchema },
            { name: MetadataModel.name, schema: MetadataSchema },
            { name: TransactionModel.name, schema: TransactionsSchema }
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
