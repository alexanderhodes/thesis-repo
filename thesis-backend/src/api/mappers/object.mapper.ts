import {ObjectEntity} from '../../database';

export function toObjectEntity(
    name: string,
    deletable: boolean
): ObjectEntity {
    return {
        name: name,
        deletable: deletable
    };
}
