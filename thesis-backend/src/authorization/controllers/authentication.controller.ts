import {Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard, LocalAuthGuard, PermissionsGuard} from '../guards';
import {AuthenticationService} from '../services';
import {UpdateWithPasswordDTO, UserResponseDto} from '../dtos';
import {LoginResponse} from '../interfaces';
import {KeypairService} from '../../shared/services';
import {UsersService} from '../../database/services';
import {HasPermissions} from '../decorators';
import {PermissionsEnum} from '../constants';
import {UserEntity} from '../../database/entities';

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

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_UPDATE)
    @HttpCode(200)
    @Post('change-password')
    async updatePassword(@Body() updateWithPasswordDTO: UpdateWithPasswordDTO) {
        if (updateWithPasswordDTO.password && updateWithPasswordDTO.user) {
            const user: UserEntity = await this.usersService.findOneById(updateWithPasswordDTO.user);
            if (user) {
                const result: UserEntity = await this.authenticationService.updatePassword(user, updateWithPasswordDTO);
                if (result) {
                    return { success: `password updated successfully for user ${result.id}`};
                }
                throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            throw new HttpException(`Benutzer mit ID ${updateWithPasswordDTO.user} nicht gefunden`, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(`${updateWithPasswordDTO.password ? 'Es wurde kein Benutzer angegeben' : 'Es wurde kein Passwort angegeben'}`, HttpStatus.BAD_REQUEST);
    }

}
