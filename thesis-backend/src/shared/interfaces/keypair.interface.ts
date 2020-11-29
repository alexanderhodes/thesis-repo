import {ApiProperty} from '@nestjs/swagger';

export class IKeyPair {
    @ApiProperty({
        type: String
    })
    publicKey: string;
    @ApiProperty({
        type: String
    })
    privateKey: string;
}
