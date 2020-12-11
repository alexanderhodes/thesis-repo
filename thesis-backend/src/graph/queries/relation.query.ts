import {Relation} from '../interfaces';
import {createReturn, joinKeyValuePair} from './helper.query';

const CREATE_RELATION
    = `MATCH (a:{{typeA}}), (b:{{typeB}}) WHERE {{conditionA}} AND {{conditionB}} CREATE (a) {{direction1}} [r:{{relation}} {{{relationAttributes}}}] {{direction2}} (b) RETURN {{return}}`;
const READ_RELATION
    = `MATCH (a:{{typeA}} {{conditionA}} ) {{direction1}} [r{{typeRelation}} {{conditionR}} ] {{direction2}} (b{{typeB}} {{conditionB}} ) RETURN {{return}}`
const DEFAULT_RETURN = 'a,b,r';
const UPDATE_RELATION
    = `MATCH (a:{{typeA}} {{conditionA}} ) {{direction1}} [r{{typeRelation}} {{conditionR}} ] {{direction2}} (b{{typeB}} {{conditionB}} ) SET {{relationAttributes}} RETURN {{return}}`

export function createRelation(relation: Relation): string {
    const conditionA = joinKeyValuePair(relation.left.condition, '=', 'a');
    const conditionB = joinKeyValuePair(relation.right.condition, '=', 'b');
    const relationAttributes = joinKeyValuePair(relation.attributes, ':');
    const returns = createReturn(relation.return);
    const relationName = createRelationName(relation.name);

    return CREATE_RELATION
        .replace('{{typeA}}', relation.left.namespace)
        .replace('{{typeB}}', relation.right.namespace)
        .replace('{{conditionA}}', conditionA)
        .replace('{{conditionB}}', conditionB)
        .replace('{{direction1}}', '-')
        .replace('{{direction2}}', relation.direction === 'out' ? '->' : relation.direction === 'in' ? '<-' : '-')
        .replace('{{relation}}', relationName)
        .replace('{{relationAttributes}}', relationAttributes)
        .replace('{{return}}', returns.length ? returns : DEFAULT_RETURN);
}

export function readRelation(relation: Relation): string {
    const conditionA = joinKeyValuePair(relation.left.condition, ':');
    const conditionB = relation.right ? joinKeyValuePair(relation.right.condition, ':') : '';
    const conditionR = joinKeyValuePair(relation.attributes, ':');
    const returns = createReturn(relation.return);
    const relationName = createRelationName(relation.name);

    return READ_RELATION
        .replace('{{typeA}}', relation.left.namespace)
        .replace('{{typeB}}', relation.right && relation.right.namespace ? ':' + relation.right.namespace : '')
        .replace('{{conditionA}}', conditionA.length ? `{${conditionA}}` : '')
        .replace('{{conditionB}}', conditionB.length ? `{${conditionB}}` : '')
        .replace('{{conditionB}}', relation.right && relation.right.namespace && conditionB.length ? `{${conditionB}}` : '')
        .replace('{{direction1}}', relation.direction === 'out' ? '->' : relation.direction === 'in' ? '<-' : '-')
        .replace('{{direction2}}', '-')
        .replace('{{typeRelation}}', relationName)
        .replace('{{conditionR}}', conditionR.length ? `{${conditionR}}` : '')
        .replace('{{return}}', returns.length ? returns : DEFAULT_RETURN);
}

export function updateRelation(relation: Relation): string {
    const conditionA = joinKeyValuePair(relation.left.condition, ':');
    const conditionB = relation.right ? joinKeyValuePair(relation.right.condition, ':') : '';
    const conditionR = joinKeyValuePair(relation.attributes, ':');
    const returns = createReturn(relation.return);
    const relationAttributes = joinKeyValuePair(relation.attributes, ':');
    const relationName = createRelationName(relation.name);

    return UPDATE_RELATION
        .replace('{{typeA}}', relation.left.namespace)
        .replace('{{typeB}}', relation.right.namespace)
        .replace('{{typeRelation}}', relation.name ? ':' + relation.name : '')
        .replace('{{conditionA}}', conditionA)
        .replace('{{conditionB}}', conditionB)
        .replace('{{conditionR}}', conditionR.length ? `{${conditionR}}` : '')
        .replace('{{direction1}}', relation.direction === 'out' ? '->' : relation.direction === 'in' ? '<-' : '-')
        .replace('{{direction2}}', '-')
        .replace('{{relation}}', relationName)
        .replace('{{relationAttributes}}', relationAttributes)
        .replace('{{return}}', returns.length ? returns : DEFAULT_RETURN);
}

export function createRelationName(relationName: string): string {
    return relationName ? relationName.toLowerCase().split(' ').join('') : '';
}
