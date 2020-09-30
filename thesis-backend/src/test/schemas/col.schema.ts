import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Col extends Document {

    @Prop()
    name: string;
    @Prop()
    id: number;

}

export const ColSchema = SchemaFactory.createForClass(Col);
