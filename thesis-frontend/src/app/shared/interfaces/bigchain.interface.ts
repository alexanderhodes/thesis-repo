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

export interface Asset {
  namespace: Namespace;
  type: string;
  [key: string]: any;
  data: {
    identifier: string;
    name: string;
    description: string;
    disambiguatingDescription: string;
    status: Status;
    url: string;
    [key: string]: any;
  };
}

export interface MetaData {
  [key: string]: any;
}

export interface Occupation extends Asset {
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

export interface Qualification extends Asset {
  data: {
    identifier: string;
    name: string;
    description: string;
    disambiguatingDescription: string;
    status: Status;
    url: string;
  };
}

export interface Hierarchy {
  name: string;
  url: string;
}
