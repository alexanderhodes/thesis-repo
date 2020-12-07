import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database';
import {SharedModule} from '../shared';
import {AppConfigModule} from '../app-config';
import {AuthorizationModule} from '../authorization';
import {BigchainModule} from '../bigchain';
import {
    AssetsController,
    BlocksController,
    ObjectController,
    ObjectStructureController,
    PermissionsController,
    RelationController,
    RelationStructureController,
    RolesController,
    TransactionsController,
    UsersController
} from './controllers';
import {GraphModule} from '../graph';
import {CoreModule} from '../core';

const controllers = [
    AssetsController,
    BlocksController,
    ObjectController,
    ObjectStructureController,
    PermissionsController,
    RelationController,
    RelationStructureController,
    RolesController,
    TransactionsController,
    UsersController
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
