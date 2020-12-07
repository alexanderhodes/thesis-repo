import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database';
import {SharedModule} from '../shared';
import {AppConfigModule} from '../app-config';
import {AuthorizationModule} from '../authorization';
import {BigchainModule} from '../bigchain';
import {
    AssetsController,
    BlocksController,
    RelationController,
    RelationStructureController,
    TransactionsController
} from './controllers';
import {GraphModule} from '../graph';

const controllers = [
    AssetsController,
    BlocksController,
    RelationController,
    RelationStructureController,
    TransactionsController
];

@Module({
    imports: [
        AppConfigModule,
        AuthorizationModule,
        BigchainModule,
        DatabaseModule,
        GraphModule,
        SharedModule
    ],
    exports: [

    ],
    controllers: [
        ...controllers
    ]
})
export class ApiModule {

}
