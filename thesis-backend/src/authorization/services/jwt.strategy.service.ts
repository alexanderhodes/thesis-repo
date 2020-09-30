import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {jwtConstants} from '../constants';
import {Payload, User} from '../interfaces';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: Payload): Promise<User> {
        return { id: +payload.sub, username: payload.username, permissions: payload.groups };
    }
}
