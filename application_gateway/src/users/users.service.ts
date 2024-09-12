import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User } from "./user.schema";
import { UserDto } from "./user.dto";
import { CampusService } from "src/campus/campus.service";
import { Campus } from "src/campus/campus.schema";


@Injectable()
export default class UsersService{

    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private readonly campusService: CampusService,
    ){}

    findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }

    async createUser(userDTO: UserDto): Promise<User>{
      let campus: Campus = null;
      if (userDTO.campusAcronym){
        campus = await this.campusService.findCampusByAcronym(userDTO.campusAcronym);
        if (!campus) {
          throw new NotFoundException('Campus not found');
        }
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
          campus:campus,
          isAdmin:userDTO.isAdmin,
          isCoordinator:userDTO.isCoordinator
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