import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CampusModule } from './campus/campus.module';

import * as dotenv from 'dotenv';
import { CoursesModule } from './course/course.module';
dotenv.config();

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    CampusModule,
    AuthModule,
    CertificatesModule,
    CoursesModule,
  ],
})
export class AppModule {}
