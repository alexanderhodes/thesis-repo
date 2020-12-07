import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IMetadata} from '../../shared';

@Schema({
    collection: 'metadata'
})
export class Metadata extends Document {

    @Prop()
    _id: string;
    @Prop()
    id: string;
    @Prop()
    metadata: IMetadata;
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata);
