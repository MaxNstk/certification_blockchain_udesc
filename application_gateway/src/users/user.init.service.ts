import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import UsersService from './users.service';

import * as dotenv from 'dotenv';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import BlockchainConnection from 'src/blockchain/blockchain.connection';
dotenv.config();

@Injectable()
export class UserInitService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async onModuleInit() {
    const username = process.env.ADMIN_USER;
    const password = process.env.ADMIN_PASSWORD; 
    try{
        await this.usersService.findUserByUsername(username);        
    }catch(e){
			if (!(e instanceof NotFoundException)){ throw e }
			else{
				const user: User = await this.usersService.createUser(
					{
            username,
            password,
            fullName:"Admin Admin",
            isCoordinator:true,
            isAdmin:true,
            campusAcronym:"CEAVI"
          } as UserDto
				); 
        const connection: BlockchainConnection = await BlockchainConnection.getConnection(user);
        try{
          await connection.initLedger();
        }finally{
          connection.disconnect();
        }
			}
    }
  }
}
