import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CampusModule } from 'src/campus/campus.module';
import { InitService } from './init.service';
import { CoursesModule } from 'src/course/course.module';
dotenv.config();

@Module({
  imports: [
    CoursesModule,   
    CampusModule,
    UsersModule,
  ],
  providers: [InitService],
})

export class UsersModule {}
