import {AssetEntity, AssetStructureEntity} from '../../database/entities';

export function toAssetStructureEntity(
    id: string,
    asset: AssetEntity,
    createTimestamp: Date,
    datatype: string,
    deletable: boolean,
    field: string,
    nullable: boolean,
    schema: string,
    updateTimestamp: Date
): AssetStructureEntity {
    return {
        createTimestamp: createTimestamp,
        asset: asset,
        datatype: datatype,
        deletable: deletable,
        field: field,
        id: id,
        nullable: nullable,
        schema: schema,
        updateTimestamp: updateTimestamp
    };
}
