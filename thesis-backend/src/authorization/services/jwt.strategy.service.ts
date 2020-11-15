import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {jwtConstants} from '../constants';
import {Payload, UserWithPermissions} from '../interfaces';
import {UsersService} from '../../database/services';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: Payload): Promise<UserWithPermissions> {
        return this.usersService.findOneById(payload.sub);
//        return { id: payload.sub, username: payload.username, permissions: payload.permissions };
    }
}
