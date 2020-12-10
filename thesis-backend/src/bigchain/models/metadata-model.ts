import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IMetadata} from '../../shared';

@Schema({
    collection: 'metadata'
})
export class MetadataModel extends Document {

    @Prop()
    _id: string;
    @Prop()
    id: string;
    @Prop()
    metadata: IMetadata;
}

export const MetadataSchema = SchemaFactory.createForClass(MetadataModel);
