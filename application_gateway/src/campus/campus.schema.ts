import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CampusDocument = HydratedDocument<Campus>;

@Schema()
export class Campus {
  
  @Prop({unique: true})
  campusId: number;

  @Prop({required: true, unique: true})
  acronym: string;

  @Prop({required: true})
  description: string;

  @Prop({default: Date.now})
  createdAt: Date;
}

export const CampusSchema = SchemaFactory.createForClass(Campus);