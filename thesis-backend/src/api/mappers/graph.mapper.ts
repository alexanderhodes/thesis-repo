import {QueryResult} from 'neo4j-driver';
import {IGraphObject, INode, IGraphRelation, ISegment} from '../../shared/interfaces/graph.interface';

export function toGraphObjects(response: QueryResult): IGraphObject[] {
    const graphObjects: IGraphObject[] = [];
    response.records.forEach(record => {
        if (record && record['_fields']) {
            record['_fields'].forEach(field => {
                // if field has property type it is a relation
                if (field.segments) {
                    // path
                    const segments: ISegment[] = [];
                    field.segments.forEach(segment => {
                        segments.push({
                            start: toNode(segment.start),
                            relation: toRelation(segment.relationship),
                            end: toNode(segment.end)
                        })
                    })
                    graphObjects.push({
                        type: 'path',
                        data: {
                            segments: segments
                        }
                    })
                } else if (field.type) {
                    // relation
                    graphObjects.push({
                        type: 'relation',
                        data: toRelation(field)
                    });
                } else {
                    // node
                    graphObjects.push({
                        type: 'node',
                        data: toNode(field)
                    });
                }
            });
        }
    });
    return graphObjects;
}

export function toNode(object: any): INode {
    return {
        name: object.labels[0],
        properties: object.properties
    };
}

export function toRelation(object: any): IGraphRelation {
    return {
        name: object.type,
        properties: object.properties
    };
}
