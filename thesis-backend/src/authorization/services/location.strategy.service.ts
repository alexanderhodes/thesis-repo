import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class LocationStrategyService extends PassportStrategy(Strategy) {

    constructor(private authenticationService: AuthenticationService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authenticationService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
