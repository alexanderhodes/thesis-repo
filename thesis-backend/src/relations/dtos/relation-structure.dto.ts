import {ApiProperty} from '@nestjs/swagger';
import {DbRelationDto} from './relation.dto';

export type UpdateRelationStructureType = 'CREATE' | 'UPDATE' | 'DELETE';

export class DbRelationStructureDto {
    @ApiProperty({
        type: String,
        nullable: true
    })
    readonly id?: string;
    @ApiProperty( {
        type: String
    })
    readonly field: string;
    @ApiProperty({
        type: DbRelationDto
    })
    readonly relation: DbRelationDto;
}

export class UpdateRelationStructuresDto {
    @ApiProperty({
        enum: ['CREATE', 'UPDATE', 'DELETE']
    })
    readonly type: UpdateRelationStructureType;
    @ApiProperty({
        type: DbRelationStructureDto
    })
    readonly relationStructure: DbRelationStructureDto;
}
