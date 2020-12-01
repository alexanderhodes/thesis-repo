export type RelationDirectory = 'in' | 'out';
export type RelationReturn = 'left' | 'right' | 'relation';

export interface Node<T> {
    n: {
        identity: any;
        labels: string[]
        properties: T
    }
}

export interface Relation {
    name: string;
    attributes: { [key: string]: any };
    direction: RelationDirectory;
    left: RelationNode,
    right: RelationNode,
    return: RelationReturn[]
}

export interface RelationNode {
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
