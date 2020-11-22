import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ObjectEntity, ObjectStructureEntity, PermissionEntity, RoleEntity, UserEntity} from './entities';
import {ObjectService, ObjectStructureService, PermissionsService, RolesService, UsersService} from './services';

const services = [
    ObjectService,
    ObjectStructureService,
    PermissionsService,
    UsersService,
    RolesService
];

const entities = [
    ObjectEntity,
    ObjectStructureEntity,
    PermissionEntity,
    RoleEntity,
    UserEntity
];

@Module({
    exports: [
        ...services
    ],
    imports: [
        TypeOrmModule.forFeature(entities)
    ],
    providers: [
        ...services
    ]
})
export class DatabaseModule {

}
