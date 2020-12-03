import {IDbRelation} from './relation.interface';

export interface IDbRelationStructure {
    id: string;
    field: string;
    createTimestamp: Date;
    updateTimestamp: Date;
    relation: IDbRelation;
}
