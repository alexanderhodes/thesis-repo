import {ApiProperty} from '@nestjs/swagger';
import {RoleDto} from './roles.dto';

export class CreateUserDto {
    @ApiProperty({
        type: String
    })
    readonly username: string;
    @ApiProperty({
        type: String
    })
    readonly password: string;
    @ApiProperty({
        type: [RoleDto]
    })
    readonly roles: RoleDto[];
}

export interface CreatedUserDto {
    id: string;
    username: string;
    privateKey: string;
    publicKey: string;
    roles: RoleDto[];
}

export interface UserResponseDto {
    id: string;
    username: string;
    publicKey: string;
    roles: RoleDto[];
}
