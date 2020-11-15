import {Body, Controller, Get, NotFoundException, Param, Post, UseGuards} from '@nestjs/common';
import {UsersService} from '../../database/services';
import {KeypairService} from '../../shared/services';
import {CreatedUserDto, CreateUserDto, UserResponseDto} from '../dtos';
import {toUserEntity} from '../mappers';
import {JwtAuthGuard, PermissionsGuard} from '../../authorization/guards';
import {HasPermissions} from '../../authorization/decorators';
import {PermissionsEnum} from '../../authorization/constants';

@Controller("api/users")
export class UsersController {

    constructor(private usersService: UsersService,
                private keypairService: KeypairService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_CREATE)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<CreatedUserDto> {
        // create key pair
        const keypair = this.keypairService.createKeyPair();
        // hash password
        const user = toUserEntity(createUser.username, createUser.password, createUser.roles, keypair.publicKey);
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
        throw new NotFoundException("User", `not found for id ${id}`);
    }

}
