import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    CertificatesModule
  ],
})
export class AppModule {}
