import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard, LocalAuthGuard, PermissionsGuard} from '../guards';
import {AuthenticationService, OldUsersService} from '../services';
import {Permissions} from '../decorators';
import {UserResponseDto} from '../dtos';
import {JwtToken, User} from '../interfaces';
import {KeypairService} from '../../shared/services';

@Controller()
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService,
                private keyPairService: KeypairService,
                private usersService: OldUsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req): Promise<JwtToken> {
        return this.authenticationService.login(req.user);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
//    @Permissions('ASSETS:READ')
    @Get('profile')
    getProfile(@Request() req): UserResponseDto {
        return <UserResponseDto>{
            id: req.user.id,
            username: req.user.username
        };
    }


    @Get('users')
    getUsers() {
        return this.usersService.getAllUsers();
    }

}
