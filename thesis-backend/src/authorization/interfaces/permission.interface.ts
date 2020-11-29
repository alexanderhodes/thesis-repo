import {ApiProperty} from '@nestjs/swagger';

export class Permission {
    @ApiProperty({
        type: String
    })
    name: string;
}
