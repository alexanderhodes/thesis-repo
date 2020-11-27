import {IObject} from './object.interface';

export type UpdateObjectStructureType = 'CREATE' | 'UPDATE' | 'DELETE';

export interface IObjectStructure {
  id?: string;
  field: string;
  datatype: string;
  schema: string;
  nullable: boolean;
  deletable: boolean;
  createTimestamp?: Date;
  updateTimestamp?: Date;
  object?: IObject;
}

export interface IUpdateObjectStructure {
  type: UpdateObjectStructureType;
  objectStructure: IObjectStructure;
}

export interface IUpdateObjectStructureResponse {
  message?: string;
  objectStructure: IObjectStructure;
  response: 'ERROR' | 'SUCCESS';
}
