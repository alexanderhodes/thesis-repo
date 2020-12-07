import {ApiProperty} from '@nestjs/swagger';
import {DbRelationDto} from './relation.dto';

export type UpdateRelationStructureType = 'CREATE' | 'UPDATE' | 'DELETE';

export class DbRelationStructureDto {
    readonly id?: string;
    readonly field: string;
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
