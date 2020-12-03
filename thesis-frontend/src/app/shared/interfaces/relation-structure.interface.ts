import {DbRelation} from './relation.interface';

export type UpdateRelationStructureType = 'CREATE' | 'UPDATE' | 'DELETE';

export interface DbRelationStructure {
  id?: string;
  field: string;
  createTimestamp?: Date;
  updateTimestamp?: Date;
  relation?: DbRelation;
}

export interface UpdateRelationStructure {
  type: UpdateRelationStructureType;
  relationStructure: DbRelationStructure;
}

export interface UpdateRelationStructureResponse {
  message?: string;
  relationStructure: DbRelationStructure;
  response: 'ERROR' | 'SUCCESS';
}
