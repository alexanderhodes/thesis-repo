import {TransactionType} from '../types';
import {IAsset} from './asset.interface';

export interface IMetadata {
    transactionType: TransactionType;
    asset: IAsset;
    timestamp: number;
    data?: any;
    user: string;
}
