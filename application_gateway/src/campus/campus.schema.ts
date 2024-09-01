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

  @Prop({required: true})
  cryptoPath: string;

  @Prop({required: true})
  certDirectoryPath: string;

  @Prop({required: true})
  tlsCertPath: string;

  @Prop({required: true})
  keyDirectoryPath: string;

  @Prop({required: true})
  peerEndpoint: string;

  @Prop({required: true})
  peerHostAlias: string;
}

export const CampusSchema = SchemaFactory.createForClass(Campus);