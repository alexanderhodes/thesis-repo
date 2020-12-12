import {ApiProperty} from '@nestjs/swagger';

export class DbRelationDto {
    @ApiProperty({
        type: String
    })
    readonly name: string;
}

