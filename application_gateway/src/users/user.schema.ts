import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Campus } from 'src/campus/campus.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  
  @Prop({unique: true})
  userId: number;

  @Prop({required: true, unique: true})
  username: string;
  
  @Prop({required: true, unique: true})
  fullName:string;

  @Prop({required: true})
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Campus.name })
  campus: Campus;

  @Prop({ default:false })
  isAdmin: boolean;

  @Prop({ default:false })
  isCoordinator: boolean;

  @Prop({default: Date.now})
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);