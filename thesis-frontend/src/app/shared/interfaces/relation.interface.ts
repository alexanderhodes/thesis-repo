import {DbRelationStructure} from './relation-structure.interface';

export interface DbRelation {
  name: string;
  relationStructures?: DbRelationStructure[];
}
