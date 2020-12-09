import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {UsersService} from '../../database';
import {KeypairService, HashingService} from '../../shared';
import {CreatedUserDto, CreateUserDto, UserResponseDto} from '../dtos';
import {toUserEntity} from '../mappers';
import {HasPermissions, JwtAuthGuard, PermissionsEnum, PermissionsGuard} from '../../authorization';

@ApiTags("users")
@Controller("users")
export class UsersController {

    constructor(private usersService: UsersService,
                private hashingService: HashingService,
                private keypairService: KeypairService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_CREATE)
    @Post()
    @ApiBearerAuth()
    async createUser(@Body() createUser: CreateUserDto): Promise<CreatedUserDto> {
        // has password
        const hashedPassword = await this.hashingService.createHash(createUser.password);
        // create key pair
        const keypair = this.keypairService.createKeyPair();
        // hash private key
        const hashedPrivateKey = await this.hashingService.createHash(keypair.privateKey);
        // hash password
        const user = toUserEntity(createUser.username, hashedPassword, createUser.roles, keypair.publicKey, hashedPrivateKey);
        // save user to database
        const insertedUser = await this.usersService.insert(user);
        // check result from insert
        if (insertedUser) {
            const id = insertedUser ? insertedUser.id : null
            // create response object with private key
            return {
                id: id,
                username: user.username,
                privateKey: keypair.privateKey,
                publicKey: keypair.publicKey,
                roles: user.roles
            };
        } else {
            return null;
        }
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get()
    @ApiBearerAuth()
    async getAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.usersService.findAll();
        return users.map(user => <UserResponseDto>{
            id: user.id,
            roles: user.roles,
            publicKey: user.publicKey,
            username: user.username
        });
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get(":id")
    @ApiBearerAuth()
    async getUserById(@Param("id") id: string): Promise<UserResponseDto> {
        const user = await this.usersService.findOneById(id);
        if (user) {
            return {
                id: user.id,
                roles: user.roles,
                publicKey: user.publicKey,
                username: user.username
            }
        }
        throw new HttpException(`Der Benutzer mit der ID ${id} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_DELETE)
    @Delete(":id")
    @ApiBearerAuth()
    async deleteUser(@Param("id") id: string) {
        const result = await this.usersService.remove(id);
        if (result && result.affected) {
            return {};
        }
        throw new HttpException(`Der Benutzer mit der ID ${id} wurde nicht gefunden.`, HttpStatus.NOT_FOUND);
    }

}
