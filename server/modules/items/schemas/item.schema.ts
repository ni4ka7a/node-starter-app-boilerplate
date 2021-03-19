import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    prop2: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
