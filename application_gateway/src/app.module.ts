import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CampusModule } from './campus/campus.module';

import * as dotenv from 'dotenv';
import { CoursesModule } from './course/course.module';
import { UsersModule } from './users/users.module';
import { InitModule } from './init/init.module';
dotenv.config();

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    CampusModule,
    UsersModule,
    AuthModule,
    CoursesModule,
    InitModule,
    CertificatesModule,
  ],
})
export class AppModule {}
