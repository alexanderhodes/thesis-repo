import {TransactionType} from '../types';

export interface IMetadata {
    transactionType: TransactionType;
    asset: string;
    timestamp: string;
    data?: any;
    [key: string]: any;
}
