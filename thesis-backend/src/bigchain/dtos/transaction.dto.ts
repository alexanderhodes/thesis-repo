import {MetadataDto} from './metadata.dto';
import {AssetDto} from './asset.dto';

export class TransactionDto {
    readonly inputs: [
        {
            readonly owners_before: string[];
            readonly fulfills: null;
            readonly fulfillment: string;
        }
    ];
    readonly outputs: [
        {
            readonly public_keys: string[];
            readonly condition: {
                readonly details: {
                    readonly type: string;
                    readonly public_key: string;
                };
                readonly uri: string;
            };
            readonly amount: string
        }
    ];
    readonly operation: string;
    readonly metadata: MetadataDto;
    readonly asset: {
        data: AssetDto;
    };
    readonly version: string;
    readonly id: string;
}
