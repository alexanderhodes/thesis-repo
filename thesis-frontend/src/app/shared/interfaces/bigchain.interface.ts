import {GraphObject} from './graph.interface';

export interface Transaction {
  inputs: [
    {
      owners_before: string[],
      fulfills: null,
      fulfillment: string
    }
  ];
  outputs: [
    {
      public_keys: string[],
      condition: {
        details: {
          type: string,
          public_key: string
        },
        uri: string
      },
      amount: string
    }
  ];
  operation: string;
  metadata: MetaData;
  asset: {
    data: Asset
  };
  version: string;
  id: string;
}

export interface AssetTransaction {
  metadata: MetaData;
  asset: Asset;
  transaction: any;
}

export type Namespace = 'occupation' | 'qualification' | 'relation' | string;
export type Status = 'draft' | 'in validation' | 'released';

export type RelationDirection = 'in' | 'out' | 'both';
export type RelationReturn = 'left' | 'right' | 'relation';
export type TransactionType = 'create' | 'update' | 'delete';

export interface MetaData {
  transactionType: TransactionType;
  asset: Asset;
  timestamp: number;
  data?: any;
  user: string;
}

export interface Asset {
  namespace: Namespace;
  data: {
    uuid: string;
    identifier: string;
    name: string;
    status: Status;
    [key: string]: any;
  };
}

export interface Resource extends Asset {
  data: {
    uuid: string;
    identifier: string;
    name: string;
    description: string;
    disambiguatingDescription: string;
    status: Status;
    url: string;
  };
}

// export interface Occupation extends Resource {
//   data: {
//     uuid: string;
//     identifier: string;
//     name: string;
//     description: string;
//     disambiguatingDescription: string;
//     occupationalCategory: string;
//     hierarchy: Hierarchy[];
//     narrowerOccupations: Occupation[];
//     status: Status;
//     url: string;
//     skills: Qualification[];
//   };
// }
//
// export interface Qualification extends Resource {
//   data: {
//     uuid: string;
//     identifier: string;
//     name: string;
//     description: string;
//     disambiguatingDescription: string;
//     status: Status;
//     url: string;
//   };
// }

export interface Relation extends Asset {
  data: {
    uuid: string;
    identifier: string;
    name: string;
    attributes: {
      uuid: string;
      [key: string]: any
    };
    direction: RelationDirection;
    left: RelationNode;
    right: RelationNode;
    return?: RelationReturn[];
    status: Status;
  };
}

export interface RelationNode {
  namespace: Namespace;
  condition: { [key: string]: any };
}

export interface Hierarchy {
  name: string;
  url: string;
}

export interface GraphRelationsResponse {
  relation: GraphObject[];
}
