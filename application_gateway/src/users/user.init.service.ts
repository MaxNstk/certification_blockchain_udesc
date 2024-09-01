import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import UsersService from './users.service';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UserInitService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async onModuleInit() {
    const username = process.env.ADMIN_USER;
    const password = process.env.ADMIN_PASSWORD; 
    const fullName = "Admin Admin";
    try{
        await this.usersService.findUserByUsername(username);        
    }catch(e){
			if (!(e instanceof NotFoundException)){ throw e }
			else{
				await this.usersService.createUser(
					username,
					password,
          fullName
				); 
			}
    }
  }
}
