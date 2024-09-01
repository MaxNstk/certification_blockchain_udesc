import { Module } from '@nestjs/common';
import {getConnectionToken, MongooseModule} from '@nestjs/mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Connection } from 'mongoose';
import { Campus, CampusSchema } from './campus.schema';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { UsersModule } from 'src/users/users.module';
import { CampusInitService } from './campus.init.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeatureAsync([
    { 
      name: Campus.name, 
      useFactory: async (connection: Connection)=>{
        const schema = CampusSchema;
        const autoIncrement = AutoIncrementFactory(connection);
        schema.plugin(autoIncrement, {inc_field: 'campusId'});
        return schema;
      },
      inject: [getConnectionToken()]
    }
    ])
  ],
  providers: [CampusService, CampusInitService],
  controllers: [CampusController],
  exports: [CampusService]
})
export class CampusModule {}

