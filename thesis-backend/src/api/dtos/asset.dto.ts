import {Namespace, Status} from '../../shared/types';
import {RelationDirectory, RelationNode, RelationReturn} from '../../neo4j/interfaces';

export class AssetDto {
    readonly namespace: Namespace;
    readonly data: {
        readonly [key: string]: any;
    };
}

export class ResourceDto extends AssetDto {
    readonly data: {
        readonly identifier: string;
        readonly name: string;
        readonly description: string;
        readonly disambiguatingDescription: string;
        readonly status: Status;
        readonly url: string;
    }
}

export class OccupationDto extends ResourceDto {
   readonly data: {
       readonly identifier: string;
       readonly name: string;
       readonly description: string;
       readonly disambiguatingDescription: string;
       readonly occupationalCategory: string;
       readonly hierarchy: Hierarchy[];
       readonly narrowerOccupations: OccupationDto[];
       readonly status: Status;
       readonly url: string;
       readonly skills: QualificationDto[];
   };
}

export class QualificationDto extends ResourceDto {
    readonly data: {
        readonly identifier: string;
        readonly name: string;
        readonly description: string;
        readonly disambiguatingDescription: string;
        readonly status: Status;
        readonly url: string;
    };
}

export class RelationDto extends AssetDto {
    readonly data: {
        readonly name: string;
        readonly attributes: { [key: string]: any };
        readonly direction: RelationDirectory;
        readonly left: RelationNode,
        readonly right: RelationNode,
        readonly return?: RelationReturn[]
    };
}

export class Hierarchy {
    name: string;
    url: string;
}
