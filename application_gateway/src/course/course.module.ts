import { Module } from '@nestjs/common';
import {getConnectionToken, MongooseModule} from '@nestjs/mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';

import * as dotenv from 'dotenv';
import { Course, CourseSchema } from './course.schema';
import { CampusModule } from 'src/campus/campus.module';
import CoursesService from './course.service';
import { CampusService } from 'src/campus/campus.service';
import { CourseInitService } from './course.init.service';
import { CoursesController } from './course.controller';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
    { 
      name: Course.name, 
      useFactory: async (connection: Connection)=>{
        const schema = CourseSchema;
        const autoIncrement = AutoIncrementFactory(connection);
        schema.plugin(autoIncrement, {inc_field: 'courseId'});
        return schema;
      },
      inject: [getConnectionToken()]
    }
    ]),
    CampusModule
  ],
  exports: [CoursesService],
  controllers: [CoursesController],
  providers: [CourseInitService, CoursesService],
})

export class CoursesModule {}
