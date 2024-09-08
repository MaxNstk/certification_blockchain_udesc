import { Body, Request, Controller, ForbiddenException, Get, Param, Post, UseGuards } from "@nestjs/common";
import UsersService from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "./user.schema";
import { UserDto } from "./user.dto";


@Controller('users')
export class UsersController{

  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User>{
      return await this.userService.findUserByUsername(username);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Request() req, @Body() userDto: UserDto): Promise<User> {
    if (req.user.isAdmin){
      return await this.userService.createUser(userDto);
    }
    if (req.user.campus.campusId != userDto.campusId){
      throw new ForbiddenException("The campus is not allowed. Should be yours"); 
    }
    if (req.user.isCoordinator && !userDto.isAdmin){
      return await this.userService.createUser(userDto);
    }
    throw new ForbiddenException("Notice, just admins or coordinators can create users"); 
  }
  
}