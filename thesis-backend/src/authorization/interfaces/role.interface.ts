import {Permission} from './permission.interface';
import {ApiProperty} from '@nestjs/swagger';

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
