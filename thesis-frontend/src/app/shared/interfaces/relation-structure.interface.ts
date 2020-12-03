import {DbRelation} from './relation.interface';

export interface DbRelationStructure {
  id: string;
  field: string;
  createTimestamp: Date;
  updateTimestamp: Date;
  relation: DbRelation;
}
