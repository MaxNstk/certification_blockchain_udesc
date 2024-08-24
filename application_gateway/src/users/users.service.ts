import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User } from "./user.schema";


@Injectable()
export default class UsersService{

    constructor(@InjectModel('User') private userModel: Model<User>){}

    findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }

    async createUser(username: string, password:string): Promise<User>{
      try{
        await this.findUserByUsername(username);
        throw new BadRequestException('user already exists');
      }catch (e){
        if (!(e instanceof NotFoundException)){
          throw e
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = new this.userModel({username, password:hashPassword})
        return newUser.save();
      }
    }

    async findUserByUsername(username:string): Promise<User> {
      const user = await this.userModel.findOne({username}).exec();
      if (!user){
        throw new NotFoundException();
      }
      return user;
    }
}