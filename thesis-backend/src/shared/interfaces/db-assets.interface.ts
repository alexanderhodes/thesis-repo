import {DbAssetStructure} from './db-assets-structure.interface';

export interface DbAsset {
    name: string;
    deletable: boolean;
    assetStructure?: DbAssetStructure[];
}
