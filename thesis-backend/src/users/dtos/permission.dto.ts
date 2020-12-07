import {ApiProperty} from '@nestjs/swagger';

export class PermissionDto {
    @ApiProperty({
        type: String
    })
    readonly name: string;
}
