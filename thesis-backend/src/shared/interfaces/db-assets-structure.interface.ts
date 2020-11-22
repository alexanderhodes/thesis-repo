import {DbAsset} from './db-assets.interface';

export interface DbAssetStructure {
    id: string;
    field: string;
    datatype: string;
    schema: string;
    nullable: boolean;
    deletable: boolean;
    createTimestamp: Date;
    updateTimestamp: Date;
    asset: DbAsset;
}
