import {ObjectEntity, ObjectStructureEntity} from '../../database/entities';

export function toObjectStructureEntity(
    object: ObjectEntity,
    createTimestamp: Date,
    datatype: string,
    deletable: boolean,
    field: string,
    nullable: boolean,
    schema: string,
    updateTimestamp: Date,
    id: string = undefined
): ObjectStructureEntity {
    return {
        createTimestamp: createTimestamp,
        object: object,
        datatype: datatype,
        deletable: deletable,
        field: field,
        id: id,
        nullable: nullable,
        schema: schema,
        updateTimestamp: updateTimestamp
    };
}
