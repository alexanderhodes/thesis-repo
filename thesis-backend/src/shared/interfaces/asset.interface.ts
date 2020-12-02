import {Namespace, Status} from '../types';
import {RelationDirectory, RelationNode, RelationReturn} from '../../neo4j/interfaces';

export interface IAsset {
    namespace: Namespace;
    data: {
        name: string;
        [key: string]: any;
    };
}

export interface IResource extends IAsset {
    data: {
        identifier: string;
        name: string;
        description: string;
        disambiguatingDescription: string;
        status: Status;
        url: string;
    }
}

export interface IOccupation extends IResource {
    data: {
        identifier: string;
        name: string;
        description: string;
        disambiguatingDescription: string;
        occupationalCategory: string;
        hierarchy: IHierarchy[];
        narrowerOccupations: IOccupation[];
        status: Status;
        url: string;
        skills: IQualification[];
    }
}

export interface IQualification extends IResource {
    data: {
        identifier: string;
        name: string;
        description: string;
        disambiguatingDescription: string;
        status: Status;
        url: string;
    }
}

export interface IRelation extends IAsset {
    name: string;
    attributes: { [key: string]: any };
    direction: RelationDirectory;
    left: RelationNode,
    right: RelationNode,
    return: RelationReturn[]
}

export interface IHierarchy {
    name: string;
    url: string;
}