import {Namespace, Status} from '../types';
import {RelationDirection, RelationNode, RelationReturn} from '../../graph';

export interface IAsset {
    namespace: Namespace;
    data: {
        uuid: string;
        identifier: string;
        name: string;
        [key: string]: any;
    };
}

export interface IAssetWithContext {
    '@context': { [key: string]: string };
    [key: string]: any;
}

export interface IResource extends IAsset {
    data: {
        uuid: string;
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
        uuid: string;
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
        uuid: string;
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
    direction: RelationDirection;
    left: RelationNode,
    right: RelationNode,
    return: RelationReturn[]
}

export interface IHierarchy {
    name: string;
    url: string;
}
