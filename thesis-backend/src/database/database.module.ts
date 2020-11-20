import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PermissionEntity, RoleEntity, UserEntity} from './entities';
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
        TypeOrmModule.forFeature([UserEntity, PermissionEntity, RoleEntity])
    ],
    providers: [
        ...services
    ]
})
export class DatabaseModule {

}
