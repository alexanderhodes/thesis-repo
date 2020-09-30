import {IMetaData} from './meta-data.interface';
import {IAsset} from './asset.interface';

export interface ITransaction {
    "inputs": [
        {
            "owners_before": string[],
            "fulfills": null,
            "fulfillment": string
        }
    ],
    "outputs": [
        {
            "public_keys": string[],
            "condition": {
                "details": {
                    "type": string,
                    "public_key": string
                },
                "uri": string
            },
            "amount": string
        }
    ],
    "operation": string,
    "metadata": IMetaData,
    "asset": {
        "data": IAsset
    },
    "version": string,
    "id": string
}
