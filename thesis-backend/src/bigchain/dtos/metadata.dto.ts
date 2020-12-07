import {TransactionType} from '../../shared';

export class MetadataDto {
    readonly transactionType: TransactionType;
    readonly asset: string;
    readonly timestamp: string;
    readonly data?: any;
    readonly [key: string]: any;
}
