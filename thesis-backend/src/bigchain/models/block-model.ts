import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class BlockModel extends Document {

    @Prop()
    _id: string;
    @Prop()
    app_hash: string;
    @Prop()
    height: number;
    @Prop()
    transactions: string[];

}

export const BlocksSchema = SchemaFactory.createForClass(BlockModel);
