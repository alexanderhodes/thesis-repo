import {IObjectStructure} from './object-structure.interface';

export interface IObject {
    name: string;
    deletable: boolean;
    assetStructure?: IObjectStructure[];
}
