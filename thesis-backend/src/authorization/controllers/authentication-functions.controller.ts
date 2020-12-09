import {Body, Controller, HttpCode, HttpException, HttpStatus, Param, Post, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard, PermissionsGuard} from '../guards';
import {HasPermissions} from '../decorators';
import {PermissionsEnum} from '../constants';
import {PrivateKeyValidationDto, UpdateWithPasswordDto} from '../dtos';
import {UserEntity, UsersService} from '../../database';
import {AuthenticationService} from '../services';
import {HashingService, KeypairService} from '../../shared';
import {UserWithKeyPair, UserWithPermissions} from '../interfaces';

@ApiTags('authentication-functions')
@Controller('authentication-functions')
export class AuthenticationFunctionsController {

    constructor(private authenticationService: AuthenticationService,
                private keyPairService: KeypairService,
                private hashingService: HashingService,
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
    async generateKeypair(@Param("user") userId: string): Promise<UserWithKeyPair> {
        if (userId) {
            const user: UserEntity = await this.usersService.findOneById(userId);
            if (user) {
                return await this.authenticationService.generateKeypairAndUpdate(user);
            }
            throw new HttpException(`Benutzer mit ID ${userId} nicht gefunden`, HttpStatus.NOT_FOUND);
        }
        throw new HttpException(`Es wurde kein Benutzer angegeben`, HttpStatus.BAD_REQUEST);
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Post('validate-private-key')
    async validatePrivateKey(@Body() privateKeyDto: PrivateKeyValidationDto, @Request() req) {
        if (privateKeyDto && privateKeyDto.privateKey && req.user) {
            const equals = await this.hashingService.compare(privateKeyDto.privateKey, req.user.privateKey);
            if (equals) {
                return {};
            }
            throw new HttpException('Der private Schlüssel ist nicht korrekt', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Bitte geben Sie senden Sie ihren private Schlüssel.', HttpStatus.BAD_REQUEST);
    }

}
