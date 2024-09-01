import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import UsersService from './users.service';
import { UsersController } from './users.controller';
import {getConnectionToken, MongooseModule} from '@nestjs/mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';

import * as dotenv from 'dotenv';
import { UserInitService } from './user.init.service';
import { CampusService } from 'src/campus/campus.service';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
    { 
      name: User.name, 
      useFactory: async (connection: Connection)=>{
        const schema = UserSchema;
        const autoIncrement = AutoIncrementFactory(connection);
        schema.plugin(autoIncrement, {inc_field: 'userId'});
        return schema;
      },
      inject: [getConnectionToken()]
    }
    ])
  ],
  providers: [UsersService, UserInitService],
  controllers: [UsersController],
  exports: [UsersService]
})

export class UsersModule {}
