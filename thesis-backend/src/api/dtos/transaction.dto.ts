import {MetaDataDto} from './meta-data.dto';
import {AssetDto} from './asset.dto';

export class TransactionDto {
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
    metadata: MetaDataDto;
    asset: {
        data: AssetDto;
    };
    version: string;
    id: string;
}
