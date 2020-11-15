import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Permission, Role, User} from './entities';
import {PermissionsService, RolesService, UsersService} from './services';

const services = [
    PermissionsService,
    UsersService,
    RolesService
];

@Module({
    exports: [
        ...services
    ],
    imports: [
        TypeOrmModule.forFeature([User, Permission, Role])
    ],
    providers: [
        ...services
    ]
})
export class DatabaseModule {

}
