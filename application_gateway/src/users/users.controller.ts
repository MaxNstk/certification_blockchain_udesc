import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import UsersService from "./users.service";
import { User } from "./user.model";
import { AuthGuard } from "src/auth/auth.guard";


@Controller('users')
export class UsersController{

    constructor(private readonly userService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAllUsers(): Promise<User[]> {
      return await this.userService.getAllUsers();
    }

    @UseGuards(AuthGuard)
    @Get(':username')
    async getUser(@Param('username') username: string): Promise<User>{
        return await this.userService.findUserByUsername(username);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createCertificate(@Body() createUserDto: {username: string; password: string}): Promise<User> {
      return await this.userService.createUser(createUserDto.username, createUserDto.password);
    }


}