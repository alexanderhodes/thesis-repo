import {RelationEntity} from '../../database';

export function toRelationEntity(
    name: string
): RelationEntity {
    return {
        name: name
    };
}
