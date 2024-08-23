import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";
import * as bcrypt from 'bcrypt';


@Injectable()
export default class UsersService{

    constructor(@InjectModel('User') private userModel: Model<User>){}

    getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
      }

    async createUser(username: string, password:string): Promise<User>{
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = new this.userModel({username, password:hashPassword})
        return newUser.save();
    }

    async findUserByUsername(username:string): Promise< User | null>{
        return this.userModel.findOne({username}).exec();
      }
}