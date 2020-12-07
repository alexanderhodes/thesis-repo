import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IAsset} from '../../shared';

@Schema()
export class Assets extends Document {

    @Prop()
    _id: string;
    @Prop()
    data: IAsset;
    @Prop()
    id: string;

}

export const AssetSchema = SchemaFactory.createForClass(Assets);
