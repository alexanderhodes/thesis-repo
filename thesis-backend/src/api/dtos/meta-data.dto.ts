export type TransactionType = 'create' | 'update' | 'delete';

export class MetaDataDto {
    readonly transactionType: TransactionType;
    readonly initialTransaction: string;
    readonly [key: string]: any;
}
