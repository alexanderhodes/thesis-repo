import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database';
import {SharedModule} from '../shared';
import {AppConfigModule} from '../app-config';
import {AuthorizationModule} from '../authorization';
import {BigchainModule} from '../bigchain';
import {PermissionsController, UsersController} from './controllers';

const controllers = [
    PermissionsController,
    UsersController
];

@Module({
    imports: [
        AppConfigModule,
        AuthorizationModule,
        BigchainModule,
        DatabaseModule,
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
