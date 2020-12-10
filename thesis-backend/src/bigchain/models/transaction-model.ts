import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class TransactionModel extends Document {

    @Prop()
    _id: string;
    @Prop()
    id: string;
    @Prop()
    inputs: any[];
    @Prop()
    operation: string;
    @Prop()
    outputs: any[];
    @Prop()
    version: number;

}

export const TransactionsSchema = SchemaFactory.createForClass(TransactionModel);
