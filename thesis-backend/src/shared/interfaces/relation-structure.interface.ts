import {IDbRelation} from './relation.interface';

export interface IDbRelationStructure {
    id: string;
    field: string;
    createTimestamp: Date;
    updateTimestamp: Date;
    relation: IDbRelation;
}

export interface IUpdateRelationStructureResponse {
    message?: string;
    relationStructure: IDbRelationStructure;
    response: 'ERROR' | 'SUCCESS';
}
