import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
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

  async createCampus(
    @Body() createCampusDto: {
      acronym:string
      description:string
      cryptoPath:string
      certDirectoryPath:string
      tlsCertPath:string
      keyDirectoryPath:string
      peerEndpoint:string
      peerHostAlias:string
    }
  ): Promise<Campus> {
    const newCampus = new this.campusModel({...createCampusDto})
    return await newCampus.save();
  }
}
