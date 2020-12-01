import {Namespace, Status} from '../types';

export interface IAsset {
    namespace: Namespace;
    type: string;
    [key: string]: any;
    data: {
        identifier: string;
        name: string;
        description: string;
        disambiguatingDescription: string;
        status: Status;
        url: string;
        [key: string]: any;
    };
}

export interface IOccupation extends IAsset {
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

export interface IQualification extends IAsset {
    data: {
        identifier: string;
        name: string;
        description: string;
        disambiguatingDescription: string;
        status: Status;
        url: string;
    }
}

export interface IHierarchy {
    name: string;
    url: string;
}
