import {IAsset} from '../../shared';
import {joinArrayElements, joinKeyValuePair, LIMIT, ORDER_BY, WHERE} from './helper.query';
import {GraphQuery} from '../interfaces';

const CREATE_NODE = "CREATE ({{id}}:{{type}} {{{attributes}}})";
const READ_NODES = "MATCH (n:{{type}}) RETURN n";
const READ_NODES_BY_QUERY = "MATCH (n:{{type}}) [WHERE] RETURN {{attributes}} [ORDERBY] [LIMIT]";
const UPDATE_NODE = "MATCH (n:{{type}} {{{query}}}) SET {{attributes}} RETURN n";

export function createNodeQuery(assetId: string, asset: { [key: string]: any }, type: string): string {
    const attributes = joinKeyValuePair(asset, ':');
    // replace all non letter characters with nothing
    const id = assetId.replace(/[\W_]+/g, '');
    return CREATE_NODE
        .replace('{{id}}', `id${id}`)
        .replace('{{type}}', type)
        .replace('{{attributes}}', attributes);
}

export function updateNodeQuery(assetId: string, asset: { [key: string]: any }, type: string): string {
    const attributes = joinKeyValuePair(asset, '=', 'n');
    return UPDATE_NODE
        .replace('{{type}}', type)
        .replace('{{query}}', `uuid: '${assetId}'`)
        .replace('{{attributes}}', attributes);
}

export function createNodeQueryForAsset(asset: IAsset): string {
    return createNodeQuery(asset.data.uuid, asset.data, asset.namespace);
}

export function updateNodeQueryForAsset(asset: IAsset): string {
    return updateNodeQuery(asset.data.uuid, asset.data, asset.namespace);
}

export function createNodeQueryWithQuery(graphQuery: GraphQuery): string {
    // replace type
    let query = READ_NODES_BY_QUERY.replace('{{type}}', graphQuery.node);
    // replace attributes
    query = query.replace('{{attributes}}', joinArrayElements(graphQuery.attributes, 'n', true));
    // replace WHERE clause
    query = query.replace('[WHERE]', graphQuery.condition && Object.keys(graphQuery.condition).length ?
        WHERE.replace('{{query}}', joinKeyValuePair(graphQuery.condition, '=', 'n')) : '');
    // replace ORDERBY clause
    query = query.replace('[ORDERBY]', graphQuery.orderBy && graphQuery.orderBy.length ?
        ORDER_BY.replace('{{orderBy}}', joinArrayElements(graphQuery.attributes, 'n')) : '');
    // replace LIMIT clause
    query = query.replace('[LIMIT]', graphQuery.limit ? LIMIT.replace('{{limit}}', `${graphQuery.limit}`) : '');
    return query;
}

export function getNodesByType(type: string): string {
    return READ_NODES.replace('{{type}}', type);
}
