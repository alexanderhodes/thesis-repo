import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {
    ObjectEntity,
    ObjectStructureEntity,
    PermissionEntity,
    RelationEntity,
    RelationStructureEntity,
    RoleEntity,
    UserEntity
} from './entities';
import {
    ObjectService,
    ObjectStructureService,
    PermissionsService,
    RelationService,
    RelationStructureService,
    RolesService,
    UsersService
} from './services';

const services = [
    ObjectService,
    ObjectStructureService,
    PermissionsService,
    UsersService,
    RelationService,
    RelationStructureService,
    RolesService
];

const entities = [
    ObjectEntity,
    ObjectStructureEntity,
    PermissionEntity,
    RelationEntity,
    RelationStructureEntity,
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
