import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AssetEntity, AssetStructureEntity, PermissionEntity, RoleEntity, UserEntity} from './entities';
import {AssetService, AssetStructureService, PermissionsService, RolesService, UsersService} from './services';

const services = [
    AssetService,
    AssetStructureService,
    PermissionsService,
    UsersService,
    RolesService
];

const entities = [
    AssetEntity,
    AssetStructureEntity,
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
