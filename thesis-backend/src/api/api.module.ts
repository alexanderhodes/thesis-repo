import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database';
import {SharedModule} from '../shared';
import {AppConfigModule} from '../app-config';
import {AuthorizationModule} from '../authorization';
import {BigchainModule} from '../bigchain';
import {
    AssetsController,
    BlocksController,
    GraphController,
    ObjectController,
    ObjectStructureController,
    PermissionsController,
    RelationController,
    RelationStructureController,
    RolesController,
    TransactionsController,
    UsersController
} from './controllers';
import {Neo4jModule} from '../neo4j';

const controllers = [
    AssetsController,
    BlocksController,
    ObjectController,
    ObjectStructureController,
    GraphController,
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
        Neo4jModule,
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
