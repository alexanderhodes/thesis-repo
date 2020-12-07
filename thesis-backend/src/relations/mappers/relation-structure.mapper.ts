import {RelationEntity, RelationStructureEntity} from '../../database';

export function toRelationStructureEntity(
    relation: RelationEntity,
    field: string,
    createTimestamp: Date,
    updateTimestamp: Date,
    id: string = undefined
): RelationStructureEntity {
    return {
        createTimestamp: createTimestamp,
        field: field,
        id: id,
        relation: relation,
        updateTimestamp: updateTimestamp
    }
}
