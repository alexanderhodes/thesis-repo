import {Namespace, Status} from '../../shared/types';

export class AssetDto {
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

export class OccupationDto extends AssetDto {
   data: {
       identifier: string;
       name: string;
       description: string;
       disambiguatingDescription: string;
       occupationalCategory: string;
       hierarchy: Hierarchy[];
       narrowerOccupations: OccupationDto[];
       status: Status;
       url: string;
       skills: QualificationDto[];
   }
}

export interface QualificationDto extends AssetDto {
    data: {
        identifier: string;
        name: string;
        description: string;
        disambiguatingDescription: string;
        status: Status;
        url: string;
    }
}

export class Hierarchy {
    name: string;
    url: string;
}
