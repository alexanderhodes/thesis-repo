import {IObject} from '../../shared/interfaces';
import {ApiProperty} from '@nestjs/swagger';

export type UpdateObjectStructureType = 'CREATE' | 'UPDATE' | 'DELETE';

export class ObjectStructureDto {
    @ApiProperty({
        type: String,
        nullable: true
    })
    readonly id?: string;
    @ApiProperty({
        type: String
    })
    readonly field: string;
    @ApiProperty({
        type: String
    })
    readonly datatype: string;
    @ApiProperty({
        type: String
    })
    readonly schema: string;
    @ApiProperty({
        type: Boolean
    })
    readonly nullable: boolean;
    @ApiProperty({
        type: Boolean
    })
    readonly deletable: boolean;
    @ApiProperty({
        type: IObject
    })
    readonly object: IObject;
}

export class UpdateObjectStructuresDto {
    @ApiProperty({
        enum: ['CREATE', 'UPDATE', 'DELETE']
    })
    readonly type: UpdateObjectStructureType;
    @ApiProperty({
        type: ObjectStructureDto
    })
    readonly objectStructure: ObjectStructureDto;
}
