import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Assets extends Document {

    @Prop()
    _id: string;
    @Prop()
    data: any;
    @Prop()
    id: string;

}

export const AssetSchema = SchemaFactory.createForClass(Assets);