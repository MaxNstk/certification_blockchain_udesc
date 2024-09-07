import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Campus } from 'src/campus/campus.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  
  @Prop({unique: true})
  courseId: number;

  @Prop({required: true})
  name: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Campus.name })
  campus: Campus;

  @Prop({default: Date.now})
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);