import {ApiProperty} from '@nestjs/swagger';
import {Role} from './role.interface';
import {IKeyPair} from '../../shared';

export class UserWithPermissions {
    @ApiProperty({
        type: String
    })
    id: string;
    @ApiProperty({
        type: String
    })
    username: string;
    @ApiProperty({
        type: String,
        nullable: true
    })
    password?: string;
    @ApiProperty({
        type: [Role]
    })
    roles: Role[];
    @ApiProperty({
        type: String
    })
    publicKey: string;
    // @ApiProperty({
    //     type: IKeyPair
    // })
    // keyPair?: IKeyPair
}

export class UserWithKeyPair {
    @ApiProperty({
        type: String
    })
    id: string;
    @ApiProperty({
        type: String
    })
    username: string;
    @ApiProperty({
        type: String,
        nullable: true
    })
    password?: string;
    @ApiProperty({
        type: [Role]
    })
    roles: Role[];
    @ApiProperty({
        type: IKeyPair
    })
    keyPair?: IKeyPair
}

export class UserWithPassword {
    @ApiProperty({
        type: String
    })
    user: string;
    @ApiProperty({
        type: String
    })
    password: string;
}
