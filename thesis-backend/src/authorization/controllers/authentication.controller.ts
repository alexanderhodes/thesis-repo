import {Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard, LocalAuthGuard} from '../guards';
import {AuthenticationService} from '../services';
import {UserResponseDto} from '../dtos';
import {LoginResponse} from '../interfaces';
import {KeypairService} from '../../shared/services';
import {UsersService} from '../../database/services';

@Controller('auth')
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService,
                private keyPairService: KeypairService,
                private usersService: UsersService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<LoginResponse> {
        return this.authenticationService.login(req.user);
    }

    @Post('login/silent')
    async loginSilent(): Promise<LoginResponse> {
        return this.authenticationService.loginSilent();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req): Promise<UserResponseDto> {
        const id = req.user ? req.user.id : null;
        const user = await this.usersService.findOneById(id);
        if (user) {
            return <UserResponseDto>{
                id: user.id,
                username: user.username
            };
        }
        throw new HttpException('No content', HttpStatus.FORBIDDEN);
    }

    @Get('users')
    getUsers() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('permissions')
    getPermissions(@Request() req) {
        return { permissions: req.user.permissions };
    }

}
