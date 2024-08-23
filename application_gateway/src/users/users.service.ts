import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";



@Injectable()
export default class UsersService{
    constructor(@InjectModel('User') private userModel: Model<User>){}

    async createUser(username: string, password:string): Promise<User>{
        const newUser = new this.userModel({username, password})
        return newUser.save();
    }

    async findUserByUsername(username:string): Promise<User | null>{
        return this.userModel.findOne({username}).exec();
      }
}