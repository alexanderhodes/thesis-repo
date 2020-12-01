export type RelationshipDirection = 'in' | 'out';
export type RelationshipReturn = 'left' | 'right' | 'relation';

export interface INode<T> {
    n: {
        identity: any;
        labels: string[]
        properties: T
    }
}

export interface Relationship {
    name: string;
    attributes: { [key: string]: any };
    direction: RelationshipDirection;
    left: RelationshipNode,
    right: RelationshipNode,
    return: RelationshipReturn[]
}

export interface RelationshipNode {
    type: string;
    condition: { [key: string]: any }
}

export interface GraphQuery {
    node: string;
    attributes?: string[];
    condition?: { [key: string]: any };
    orderBy?: string[];
    limit?: number;
}
