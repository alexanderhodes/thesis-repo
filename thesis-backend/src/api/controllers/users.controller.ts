import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {UsersService} from '../../database/services';
import {KeypairService} from '../../shared/services';
import {CreatedUserDto, CreateUserDto} from '../dtos';
import {toUserEntity} from '../mappers';
import {JwtAuthGuard} from '../../authorization/guards';

@Controller("api/users")
export class UsersController {

    constructor(private usersService: UsersService,
                private keypairService: KeypairService) {}

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<CreatedUserDto> {
        // create key pair
        const keypair = this.keypairService.createKeyPair();
        // hash password
        const user = toUserEntity(createUser.username, createUser.password, createUser.permissions, keypair.publicKey);
        // save user to database
        const insertedUser = await this.usersService.insert(user);
        // check result from insert
        if (insertedUser) {
            const id = insertedUser ? insertedUser.id : null
            // create response object with private key
            return {
                id: id,
                username: user.username,
                privateKey: keypair.privateKey
            };
        } else {
            return null;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getUserById(@Param("id") id: string) {
        return this.usersService.findOneById(id);
    }

}
