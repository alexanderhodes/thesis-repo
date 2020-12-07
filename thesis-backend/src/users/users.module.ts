import {Module} from '@nestjs/common';
import {PermissionsController, RolesController, UsersController} from './controllers';
import {AuthorizationModule} from '../authorization';
import {DatabaseModule} from '../database';
import {SharedModule} from '../shared';

const controllers = [
    PermissionsController,
    RolesController,
    UsersController
];

const services = [];

@Module({
    controllers: [
        ...controllers
    ],
    exports: [],
    imports: [
        AuthorizationModule,
        DatabaseModule,
        SharedModule
    ],
    providers: [
        ...services
    ]
})
export class UsersModule {

}
