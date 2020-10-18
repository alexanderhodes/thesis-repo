import {Injectable} from '@nestjs/common';
import {JwtToken, Payload, User} from '../interfaces';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../../database/services';
import {PermissionsEnum} from '../constants';

@Injectable()
export class AuthenticationService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        // if (user && user.password === password) {
        //     return {
        //         id: user.id,
        //         username: user.username,
        //         publicKey: user.publicKey,
        //         permissions: user.permissions
        //     };
        // }
        // return null;

        return (user && user.password === password) ? {
            id: user.id,
            username: user.username,
            publicKey: user.publicKey,
            permissions: user.permissions
        } : null;
    }

    async login(user: User): Promise<JwtToken> {
        const payload: Payload = {
            sub: `${user.id}`,
            username: user.username,
            permissions: user.permissions
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async loginSilent(): Promise<JwtToken> {
        const payload: Payload = {
            sub: null,
            username: null,
            permissions: [PermissionsEnum.ASSETS_READ]
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}
