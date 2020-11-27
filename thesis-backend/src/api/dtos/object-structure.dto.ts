import {IObject} from '../../shared/interfaces';

export type UpdateObjectStructureType = 'CREATE' | 'UPDATE' | 'DELETE';

export class ObjectStructureDto {
    readonly id?: string;
    readonly field: string;
    readonly datatype: string;
    readonly schema: string;
    readonly nullable: boolean;
    readonly deletable: boolean;
    readonly object: IObject;
}

export class UpdateObjectStructuresDto {
    readonly type: UpdateObjectStructureType;
    readonly objectStructure: ObjectStructureDto;
}
