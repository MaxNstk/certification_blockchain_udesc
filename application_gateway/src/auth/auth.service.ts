import { Injectable, UnauthorizedException } from "@nestjs/common";
import UsersService from "src/users/users.service";

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
    ) {}

    async login(username:string, password:string): Promise<string>{
        const user = await this.usersService.findUserByUsername(username);

        if (!user){ 
            throw new UnauthorizedException();
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match){
            throw new UnauthorizedException();
        } 
        return "TOKEN!"
    }
}
