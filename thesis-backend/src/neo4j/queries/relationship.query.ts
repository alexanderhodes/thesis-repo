import {Relationship} from '../interfaces';
import {createReturn, joinKeyValuePair} from './helper.query';

const CREATE_RELATIONSHIP
    = `MATCH (a:{{typeA}}), (b:{{typeB}}) WHERE {{conditionA}} AND {{conditionB}} CREATE (a) {{direction1}} [r:{{relation}} {{{relationAttributes}}}] {{direction2}} (b) RETURN {{return}}`;
const READ_RELATIONSHIP
    = `MATCH (a:{{typeA}} {{conditionA}} ) {{direction1}} [r:{{typeRelation}} {{conditionR}} ] {{direction2}} (b{{typeB}} {{conditionB}} ) RETURN {{return}}`
const DEFAULT_RETURN = 'a,b,r';

export function createRelationship(relationship: Relationship): string {
    const conditionA = joinKeyValuePair(relationship.left.condition, '=', 'a');
    const conditionB = joinKeyValuePair(relationship.right.condition, '=', 'b');
    const relationshipAttributes = joinKeyValuePair(relationship.attributes, ':');
    const returns = createReturn(relationship.return);

    return CREATE_RELATIONSHIP
        .replace('{{typeA}}', relationship.left.type)
        .replace('{{typeB}}', relationship.right.type)
        .replace('{{conditionA}}', conditionA)
        .replace('{{conditionB}}', conditionB)
        .replace('{{direction1}}', relationship.direction === 'out' ? '->' : '<-')
        .replace('{{direction2}}', '-')
        .replace('{{relation}}', relationship.name)
        .replace('{{relationAttributes}}', relationshipAttributes)
        .replace('{{return}}', returns.length ? returns : DEFAULT_RETURN);
}

export function readRelationship(relationship: Relationship): string {
    const conditionA = joinKeyValuePair(relationship.left.condition, ':');
    const conditionB = joinKeyValuePair(relationship.right.condition, ':');
    const conditionR = joinKeyValuePair(relationship.attributes, ':');
    const returns = createReturn(relationship.return);

    return READ_RELATIONSHIP
        .replace('{{typeA}}', relationship.left.type)
        .replace('{{typeB}}', relationship.right.type ? ':' + relationship.right.type : '')
        .replace('{{conditionA}}', conditionA.length ? `{${conditionA}}` : '')
        .replace('{{conditionB}}', conditionB.length ? `{${conditionB}}` : '')
        .replace('{{conditionB}}', relationship.right.type && conditionB.length ? `{${conditionB}}` : '')
        .replace('{{direction1}}', relationship.direction === 'out' ? '->' : '<-')
        .replace('{{direction2}}', '-')
        .replace('{{typeRelation}}', relationship.name)
        .replace('{{conditionR}}', conditionR.length ? `{${conditionR}}` : '')
        .replace('{{return}}', returns.length ? returns : DEFAULT_RETURN);
}
