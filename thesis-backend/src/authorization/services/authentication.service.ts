import {Injectable} from '@nestjs/common';
import {JwtToken, Payload, User} from '../interfaces';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../../database/services';

@Injectable()
export class AuthenticationService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User): Promise<JwtToken> {
        const payload: Payload = {
            sub: `${user.id}`,
            username: user.username,
            groups: user.permissions
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}
