import {AssetEntity, AssetStructureEntity} from '../../database/entities';

export function toAssetEntity(
    name: string,
    deletable: boolean,
    assetStructure: AssetStructureEntity[]
): AssetEntity {
    return {
        name: name,
        deletable: deletable,
        assetStructure: assetStructure
    };
}
