import { Injectable, UnauthorizedException } from "@nestjs/common";
import UsersService from "src/users/users.service";

import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username:string, password:string): Promise<{ access_token: string }>{
        const user = await this.usersService.findUserByUsername(username);
        if (!user){ 
            throw new UnauthorizedException();
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match){
            throw new UnauthorizedException();
        } 
        const payload = { sub: user.userId, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };    
    }
}
