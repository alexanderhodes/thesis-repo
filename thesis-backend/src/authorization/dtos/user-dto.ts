import {ApiProperty} from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        type: String
    })
    readonly id: string;
    @ApiProperty({
        type: String
    })
    readonly username: string;
    @ApiProperty({
        type: String
    })
    readonly password: string;
}

export interface UserResponseDTO {
    id: string;
    username: string;
}

export class UpdateWithPasswordDto {
    @ApiProperty({
        type: String
    })
    readonly user: string;
    @ApiProperty({
        type: String
    })
    readonly password: string;
}
