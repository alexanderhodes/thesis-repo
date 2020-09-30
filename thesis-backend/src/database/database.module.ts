import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Permission, User} from './entities';
import {PermissionsService, UsersService} from './services';

const services = [
    PermissionsService,
    UsersService
];

@Module({
    exports: [
        ...services
    ],
    imports: [
        TypeOrmModule.forFeature([User, Permission])
    ],
    providers: [
        ...services
    ]
})
export class DatabaseModule {

}
