import {ApiProperty} from '@nestjs/swagger';
import {PermissionDto} from './permission.dto';

export class RoleDto {
    @ApiProperty({
        type: String
    })
    readonly name: string;
    @ApiProperty({
        type: PermissionDto
    })
    readonly permissions: PermissionDto[];
}
