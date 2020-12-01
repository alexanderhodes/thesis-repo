import {QueryResult} from 'neo4j-driver';
import {IRelationship} from '../../shared/interfaces';

export function toRelationships(response: QueryResult): IRelationship[] {
    const relationshipObjects: IRelationship[] = [];
    response.records.forEach(record => {
        if (record && record['_fields']) {
            record['_fields'].forEach(field => {
                // if field has property type it is a relation
                const relationshipObject: IRelationship = {
                    type: field.type ? 'relation' : 'node',
                    name: field.type ? field.type : field.labels[0],
                    properties: field.properties
                };
                relationshipObjects.push(relationshipObject);
            });
        }
    });
    return relationshipObjects;
}
