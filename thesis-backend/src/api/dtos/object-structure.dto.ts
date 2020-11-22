import {IObject} from '../../shared/interfaces';

export class ObjectStructureDto {
    readonly field: string;
    readonly datatype: string;
    readonly schema: string;
    readonly nullable: boolean;
    readonly deletable: boolean;
    readonly object: IObject;
}
