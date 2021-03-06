import {Status} from '../types';

export type IGraphObjectType = 'node' | 'relation' | 'path';

export interface INode {
    name: string;
    properties: {
        uuid?: string;
        status?: Status;
        [key: string]: any ;
    };
}

export interface IGraphRelation {
    name: string;
    properties: { [key: string]: any };
}

export interface IPath {
    segments: ISegment[];
}

export interface ISegment {
    start: INode;
    relation: INode;
    end: INode;
}

export interface IGraphObject {
    type: IGraphObjectType;
    data: IPath | INode | IGraphRelation;
}

export interface IGraphRelationsResponse {
    relation: IGraphObject[];
}
