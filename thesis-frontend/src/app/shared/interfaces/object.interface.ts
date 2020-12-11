import {IObjectStructure} from './object-structure.interface';

export interface IObject {
  name: string;
  deletable: boolean;
  objectStructure?: IObjectStructure[];
}

export interface IResourceType {
  key: string;
  description: string;
}
