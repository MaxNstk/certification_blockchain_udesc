import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Campus } from './campus.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CampusService {
 
  constructor(@InjectModel(Campus.name) private campusModel: Model<Campus>){}

  async findCampus(campusId: number): Promise<Campus> {
      const campus = await this.campusModel.findOne({campusId}).exec();
      if (!campus){
        throw new NotFoundException();
      }
      return campus;
  }

  async findCampusByAcronym(acronym: string): Promise<Campus> {
    const campus = await this.campusModel.findOne({acronym}).exec();
    if (!campus){
      throw new NotFoundException();
    }
    return campus;
  }

  async findAll(): Promise<Campus[]> {
    return this.campusModel.find().exec();
  }

  async createCampus(acronym: string, description: string): Promise<Campus> {
    try{
      await this.findCampusByAcronym(acronym);
      throw new BadRequestException('campus already exists');
    }catch (e){
      if (!(e instanceof NotFoundException)){
        throw e;
      }
      const newCampus = new this.campusModel({acronym, description})
      return newCampus.save();
    }
  }
}