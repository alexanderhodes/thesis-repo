import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {jwtConstants} from '../constants';
import {Payload, UserWithPermissions} from '../interfaces';
import {RolesService, UsersService} from '../../database';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor(private usersService: UsersService,
                private rolesService: RolesService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: Payload): Promise<UserWithPermissions> {
        if (payload.sub) {
            return this.usersService.findOneById(payload.sub);
        }
        const roles = await this.rolesService.findOneByName('EXTERN')
        return {
            id: null,
            password: null,
            publicKey: null,
            roles: [roles],
            username: payload.username
        };
    }
}
