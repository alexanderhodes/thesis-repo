import {Relation} from '../interfaces';
import {createReturn, joinKeyValuePair} from './helper.query';

const CREATE_RELATION
    = `MATCH (a:{{typeA}}), (b:{{typeB}}) WHERE {{conditionA}} AND {{conditionB}} CREATE (a) {{direction1}} [r:{{relation}} {{{relationAttributes}}}] {{direction2}} (b) RETURN {{return}}`;
const READ_RELATION
    = `MATCH (a:{{typeA}} {{conditionA}} ) {{direction1}} [r:{{typeRelation}} {{conditionR}} ] {{direction2}} (b{{typeB}} {{conditionB}} ) RETURN {{return}}`
const DEFAULT_RETURN = 'a,b,r';

export function createRelation(relation: Relation): string {
    const conditionA = joinKeyValuePair(relation.left.condition, '=', 'a');
    const conditionB = joinKeyValuePair(relation.right.condition, '=', 'b');
    const relationAttributes = joinKeyValuePair(relation.attributes, ':');
    const returns = createReturn(relation.return);

    return CREATE_RELATION
        .replace('{{typeA}}', relation.left.namespace)
        .replace('{{typeB}}', relation.right.namespace)
        .replace('{{conditionA}}', conditionA)
        .replace('{{conditionB}}', conditionB)
        .replace('{{direction1}}', relation.direction === 'out' ? '->' : '<-')
        .replace('{{direction2}}', '-')
        .replace('{{relation}}', relation.name)
        .replace('{{relationAttributes}}', relationAttributes)
        .replace('{{return}}', returns.length ? returns : DEFAULT_RETURN);
}

export function readRelation(relation: Relation): string {
    const conditionA = joinKeyValuePair(relation.left.condition, ':');
    const conditionB = joinKeyValuePair(relation.right.condition, ':');
    const conditionR = joinKeyValuePair(relation.attributes, ':');
    const returns = createReturn(relation.return);

    return READ_RELATION
        .replace('{{typeA}}', relation.left.namespace)
        .replace('{{typeB}}', relation.right.namespace ? ':' + relation.right.namespace : '')
        .replace('{{conditionA}}', conditionA.length ? `{${conditionA}}` : '')
        .replace('{{conditionB}}', conditionB.length ? `{${conditionB}}` : '')
        .replace('{{conditionB}}', relation.right.namespace && conditionB.length ? `{${conditionB}}` : '')
        .replace('{{direction1}}', relation.direction === 'out' ? '->' : '<-')
        .replace('{{direction2}}', '-')
        .replace('{{typeRelation}}', relation.name)
        .replace('{{conditionR}}', conditionR.length ? `{${conditionR}}` : '')
        .replace('{{return}}', returns.length ? returns : DEFAULT_RETURN);
}
