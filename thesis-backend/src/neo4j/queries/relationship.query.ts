import {Relationship} from '../interfaces';
import {joinKeyValuePair} from './helper.query';

const CREATE_RELATIONSHIP
    = `MATCH (a:{{typeA}}), (b:{{typeB}}) WHERE {{conditionA}} AND {{conditionB}} CREATE (a)-[r:{{relation}} {{{relationAttributes}}}]->(b) RETURN a,b`;

export function createRelationship(relationship: Relationship): string {
    const conditionA = joinKeyValuePair(relationship.left.condition, '=', 'a');
    const conditionB = joinKeyValuePair(relationship.right.condition, '=', 'b');
    const relationshipAttributes = joinKeyValuePair(relationship.attributes, ':');

    return CREATE_RELATIONSHIP
        .replace('{{typeA}}', relationship.left.type)
        .replace('{{typeB}}', relationship.right.type)
        .replace('{{conditionA}}', conditionA)
        .replace('{{conditionB}}', conditionB)
        .replace('{{relation}}', relationship.name)
        .replace('{{relationAttributes}}', relationshipAttributes);
}
