import {Namespace} from '../../shared';

export type RelationDirection = 'in' | 'out' | 'both';
export type RelationReturn = 'left' | 'right' | 'relation';

export class GraphRelationDto {
    readonly name?: string;
    readonly attributes?: { [key: string]: any };
    readonly direction: RelationDirection;
    readonly left: RelationNodeDto;
    readonly right?: RelationNodeDto;
    readonly return?: RelationReturn[]
}

export class RelationNodeDto {
    readonly namespace: Namespace;
    readonly condition: { [key: string]: any }
}

export class GraphQueryDto {
    readonly node: string;
    readonly attributes?: string[];
    readonly condition?: { [key: string]: any };
    readonly orderBy?: string[];
    readonly limit?: number;
}
