import {ObjectEntity} from '../../database/entities';

export function toObjectEntity(
    name: string,
    deletable: boolean
): ObjectEntity {
    return {
        name: name,
        deletable: deletable
    };
}
