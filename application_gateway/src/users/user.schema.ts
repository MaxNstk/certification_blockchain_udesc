import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//import { Campus } from 'src/campus/campus.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  
  @Prop({unique: true})
  userId: number;

  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true})
  password: string;

  //@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campus' })
  //campus: Campus;

  @Prop({default: Date.now})
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);