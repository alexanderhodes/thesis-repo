import {HttpModule, Module} from '@nestjs/common';
import {AppConfigModule} from '../app-config';
import {AssetsController, BlocksController, TransactionsController} from './controllers';
import {AssetsService, BigchainBaseService, BlocksService, MetadataService, TransactionsService} from './services';
import {MongooseModule} from '@nestjs/mongoose';
import {
    Assets,
    AssetSchema,
    Blocks,
    BlocksSchema,
    Metadata,
    MetadataSchema,
    Transactions,
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
            { name: Assets.name, schema: AssetSchema },
            { name: Blocks.name, schema: BlocksSchema },
            { name: Metadata.name, schema: MetadataSchema },
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
