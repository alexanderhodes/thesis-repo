import {ApiProperty} from '@nestjs/swagger';

export class IObject {
    @ApiProperty({
        type: String
    })
    readonly name: string;
    @ApiProperty({
        type: Boolean
    })
    readonly deletable: boolean;
}
