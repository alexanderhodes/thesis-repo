import {Body, Controller, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard, PermissionsGuard} from '../guards';
import {HasPermissions} from '../decorators';
import {PermissionsEnum} from '../constants';
import {UpdateWithPasswordDto} from '../dtos';
import {UserEntity} from '../../database/entities';
import {AuthenticationService} from '../services';
import {KeypairService} from '../../shared/services';
import {UsersService} from '../../database/services';
import {UserWithPermissions} from '../interfaces';

@ApiTags('authentication-functions')
@Controller('authentication-functions')
export class AuthenticationFunctionsController {

    constructor(private authenticationService: AuthenticationService,
                private keyPairService: KeypairService,
                private usersService: UsersService) {
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_UPDATE)
    @HttpCode(200)
    @Post('change-password')
    @ApiBearerAuth()
    async updatePassword(@Body() updateWithPasswordDTO: UpdateWithPasswordDto): Promise<{[key: string]: any}> {
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

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_UPDATE)
    @HttpCode(200)
    @Post('generate-keypair/:user')
    @ApiOkResponse({
        type: UserWithPermissions
    })
    @ApiBearerAuth()
    async generateKeypair(@Param("user") userId: string): Promise<UserWithPermissions> {
        if (userId) {
            const user: UserEntity = await this.usersService.findOneById(userId);
            if (user) {
                return await this.authenticationService.generateKeypairAndUpdate(user);
            }
            throw new HttpException(`Benutzer mit ID ${userId} nicht gefunden`, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(`Es wurde kein Benutzer angegeben`, HttpStatus.BAD_REQUEST);
    }

}
