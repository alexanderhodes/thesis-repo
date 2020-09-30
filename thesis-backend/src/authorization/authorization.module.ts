import {Module} from '@nestjs/common';
import {AuthenticationService, JwtStrategyService, LocationStrategyService, OldUsersService} from './services';
import {AuthenticationController} from './controllers';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
import {SharedModule} from '../shared';
import {DatabaseModule} from '../database';
import {JwtAuthGuard, LocalAuthGuard, PermissionsGuard} from './guards';

const controllers = [
    AuthenticationController
];
const services = [
    AuthenticationService,
    JwtStrategyService,
    LocationStrategyService,
    OldUsersService
];
const guards = [
    JwtAuthGuard,
    LocalAuthGuard,
    PermissionsGuard
]

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn }
        }),
        DatabaseModule,
        SharedModule
    ],
    controllers: [
        ...controllers
    ],
    providers: [
        ...services,
        ...guards
    ],
    exports: [
        ...services,
        ...guards
    ]
})
export class AuthorizationModule {

}
