import {RelationReturn} from '../interfaces';

export const WHERE = "WHERE ({{query}})";
export const ORDER_BY = "ORDER BY {{orderBy}}";
export const LIMIT = "LIMIT {{limit}}";
export const DROP_NODES_AND_RELATIONS = "MATCH (n) DETACH DELETE n";

export function joinKeyValuePair(elements: { [key: string]: any }, separator: ':' | '=' = '=', prefix?: string): string {
    return elements && Object.keys(elements).length ? Object.keys(elements).map(key => {
        return (prefix ? prefix + '.' : '') + key + separator +
            (typeof elements[key] === 'number' ? elements[key] : typeof elements[key] === 'object' ? ("\"" + JSON.stringify(elements[key]) + "\"") : ("\"" + elements[key]) + "\"");
    }).join(',') : '';
}

export function joinArrayElements(elements: string[], prefix: string, as: boolean = false): string {
    return elements && elements.length ? elements.map(element => `${prefix ? prefix + '.' : ''}${element}${as ? ' as ' + element : ''}`).join(',') : 'n';
}

export function createReturn(returns: RelationReturn[]): string {
    return returns && returns.length ? returns.map(r => r === 'left' ? 'a' : (r === 'right' ? 'b' : 'r')).join(',') : '';
}
