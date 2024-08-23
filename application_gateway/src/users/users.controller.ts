import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import UsersService from "./users.service";
import { User } from "./user.model";


@Controller('users')
export class UsersController{

    constructor(private readonly userService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
      return await this.userService.getAllUsers();
    }

    @Get(':username')
    async getUser(@Param('username') username: string): Promise<User>{
        return await this.userService.findUserByUsername(username);
    }

    @Post()
    async createCertificate(@Body() createUserDto: {username: string; password: string}): Promise<User> {
      return await this.userService.createUser(createUserDto.username, createUserDto.password);
    }


}