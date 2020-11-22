import {ObjectEntity, ObjectStructureEntity} from '../../database/entities';

export function toObjectEntity(
    name: string,
    deletable: boolean,
    objectStructure: ObjectStructureEntity[]
): ObjectEntity {
    return {
        name: name,
        deletable: deletable,
        objectStructure: objectStructure
    };
}
