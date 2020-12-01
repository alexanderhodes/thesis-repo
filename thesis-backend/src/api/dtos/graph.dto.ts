
export class RelationshipDto {
    readonly name: string;
    readonly attributes: { [key: string]: any };
    readonly left: RelationshipNodeDto;
    readonly right: RelationshipNodeDto;
}

export class RelationshipNodeDto {
    readonly type: string;
    readonly condition: { [key: string]: any }
}

export class GraphQueryDto {
    readonly node: string;
    readonly attributes?: string[];
    readonly condition?: { [key: string]: any };
    readonly orderBy?: string[];
    readonly limit?: number;
}
