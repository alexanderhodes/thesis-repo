import {DbRelationDto} from './relation.dto';

export class DbRelationStructureDto {
    readonly id?: string;
    readonly field: string;
    readonly relation: DbRelationDto;
}
