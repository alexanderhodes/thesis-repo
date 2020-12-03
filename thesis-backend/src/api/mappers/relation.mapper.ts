import {RelationEntity} from '../../database/entities';

export function toRelationEntity(
    name: string
): RelationEntity {
    return {
        name: name
    };
}
