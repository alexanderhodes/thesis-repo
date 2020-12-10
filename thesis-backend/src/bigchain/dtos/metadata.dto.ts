import {IAsset, TransactionType} from '../../shared';

export class MetadataDto {
    transactionType: TransactionType;
    asset: IAsset;
    timestamp: number;
    data?: any;
    user: string;
}
