import {DbAsset} from '../../shared/interfaces';

export class DBAssetStructureDTO {
    readonly field: string;
    readonly datatype: string;
    readonly schema: string;
    readonly nullable: boolean;
    readonly deletable: boolean;
    readonly asset: DbAsset;
}
