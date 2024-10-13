// src/pdf/schemas/pdf.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pdf extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  cloudinaryId: string;
}

export const PdfSchema = SchemaFactory.createForClass(Pdf);
