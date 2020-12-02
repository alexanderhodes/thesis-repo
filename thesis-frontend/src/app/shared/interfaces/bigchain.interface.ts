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

export type Namespace = 'occupation' | 'qualification' | 'relation' | string;
export type Status = string;

export type RelationDirectory = 'in' | 'out';
export type RelationReturn = 'left' | 'right' | 'relation';
export type TransactionType = 'create' | 'update' | 'delete';

export interface MetaData {
  transactionType: TransactionType;
  initialTransaction: string;
  [key: string]: any;
}

export interface Asset {
  namespace: Namespace;
  data: {
    [key: string]: any;
  };
}

export interface Resource extends Asset {
  data: {
    identifier: string;
    name: string;
    description: string;
    disambiguatingDescription: string;
    status: Status;
    url: string;
  };
}

export interface Occupation extends Resource {
  data: {
    identifier: string;
    name: string;
    description: string;
    disambiguatingDescription: string;
    occupationalCategory: string;
    hierarchy: Hierarchy[];
    narrowerOccupations: Occupation[];
    status: Status;
    url: string;
    skills: Qualification[];
  };
}

export interface Qualification extends Resource {
  data: {
    identifier: string;
    name: string;
    description: string;
    disambiguatingDescription: string;
    status: Status;
    url: string;
  };
}

export interface Relation extends Asset {
  data: {
    name: string;
    attributes: { [key: string]: any };
    direction: RelationDirectory;
    left: RelationNode;
    right: RelationNode;
    return?: RelationReturn[];
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
