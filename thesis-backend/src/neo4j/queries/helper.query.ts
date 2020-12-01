export const WHERE = "WHERE ({{query}})";
export const ORDER_BY = "ORDER BY {{orderBy}}";
export const LIMIT = "LIMIT {{limit}}";
export const DROP_NODES_AND_RELATIONS = "MATCH (n) DETACH DELETE n";

// export function createAttributes(keyValuePair: { [key: string]: any }): string {
//     let attributes = "";
//     const keys = Object.keys(keyValuePair);
//     Object.keys(keyValuePair).forEach((key, index) => {
//         const isLast = index === keys.length - 1;
//         const value = typeof keyValuePair[key] === 'number' ? keyValuePair[key] :
//             `'${typeof keyValuePair[key] === 'object' ? JSON.stringify(keyValuePair[key]) : keyValuePair[key]}'`;
//         attributes += `${key}: ${value}${isLast ? '' : ','}`;
//     });
//     return attributes;
// }

export function joinKeyValuePair(elements: { [key: string]: any }, separator: ':' | '=' = '=', prefix?: string): string {
    return elements && Object.keys(elements).length ? Object.keys(elements).map(key => {
        return (prefix ? prefix + '.' : '') + key + separator +
            (typeof elements[key] === 'number' ? elements[key] : typeof elements[key] === 'object' ? ("\"" + JSON.stringify(elements[key]) + "\"") : ("\"" + elements[key]) + "\"");
    }).join(',') : '';
}

export function joinArrayElements(elements: string[], prefix: string, as: boolean = false): string {
    return elements && elements.length ? elements.map(element => `${prefix ? prefix + '.' : ''}${element}${as ? ' as ' + element : ''}`).join(',') : 'n';
}
