export type IRelationshipObjectType = 'node' | 'relation';

export interface IRelationship {
    type: IRelationshipObjectType;
    name: string;
    properties: { [key: string]: any };
}
