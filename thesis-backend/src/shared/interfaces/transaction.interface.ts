import {IAsset, IMetadata} from '../index';

export interface ITransaction {
    inputs: [
        {
            owners_before: string[],
            fulfills: null,
            fulfillment: string
        }
    ],
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
    ],
    operation: string,
    metadata: IMetadata,
    asset: {
        data: IAsset
    },
    version: string,
    id: string
}
