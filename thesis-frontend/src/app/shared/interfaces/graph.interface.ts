export type GraphObjectType = 'node' | 'relation' | 'path';

export interface Node {
  name: string;
  properties: { [key: string]: any };
}

export interface GraphRelation {
  name: string;
  properties: { [key: string]: any };
}

export interface Path {
  segments: Segment[];
}

export interface Segment {
  start: Node;
  relation: Node;
  end: Node;
}

export interface GraphObject {
  type: GraphObjectType;
  data: Path | Node | GraphRelation;
}

export interface GraphQuery {
  node: string;
  attributes?: string[];
  condition?: { [key: string]: any };
  orderBy?: string[];
  limit?: number;
}
