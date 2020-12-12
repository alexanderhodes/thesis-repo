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

export class CreatedUserDto {
    @ApiProperty({
        type: String
    })
    id: string;
    @ApiProperty({
        type: String
    })
    username: string;
    @ApiProperty({
        type: String
    })
    privateKey: string;
    @ApiProperty({
        type: String
    })
    publicKey: string;
    @ApiProperty({
        type: [RoleDto]
    })
    roles: RoleDto[];
}

export class UserResponseDto {
    @ApiProperty({
        type: String
    })
    id: string;
    @ApiProperty({
        type: String
    })
    username: string;
    @ApiProperty({
        type: String
    })
    publicKey: string;
    @ApiProperty({
        type: [RoleDto]
    })
    roles: RoleDto[];
}
