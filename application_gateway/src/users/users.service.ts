import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User } from "./user.schema";
import { CreateUserDto } from "./user.dto";
import { Campus } from "src/campus/campus.schema";


@Injectable()
export default class UsersService{

    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      @InjectModel(Campus.name) private campusModel: Model<Campus>
    ){}

    findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }

    async createUser(userDTO: CreateUserDto): Promise<User>{
      const campus = await this.campusModel.findOne({ campusId:userDTO.campusId }).exec();
      if (!campus) {
        throw new NotFoundException('Campus not found');
      }
      try{
        await this.findUserByUsername(userDTO.username);
        throw new BadRequestException('user already exists');
      }catch (e){
        if (!(e instanceof NotFoundException)){
          throw e
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(userDTO.password,salt);
        const newUser = new this.userModel({
          username:userDTO.username, 
          fullName:userDTO.fullName, 
          password:hashPassword, 
          campus:campus._id,
        })
        return newUser.save();
      }
    }

    async findUserByUsername(username:string): Promise<User> {
      const user = await this.userModel
        .findOne({username})
        .populate('campus')
        .exec();
      if (!user){
        throw new NotFoundException();
      }
      return user;
    }
}