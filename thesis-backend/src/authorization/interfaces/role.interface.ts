import {ApiProperty} from '@nestjs/swagger';
import {Permission} from './permission.interface';

export class Role {
    @ApiProperty({
        type: String
    })
    name: string;
    @ApiProperty({
        type: Permission
    })
    permissions: Permission[];
}
