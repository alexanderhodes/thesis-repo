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
    left: {
        type: string;
        condition: { [key: string]: any }
    },
    right: {
        type: string;
        condition: { [key: string]: any }
    }
}

export interface GraphQuery {
    node: string;
    attributes?: string[];
    condition?: { [key: string]: any };
    orderBy?: string[];
    limit?: number;
}
