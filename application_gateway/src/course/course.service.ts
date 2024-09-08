import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Campus } from "src/campus/campus.schema";
import { Course } from "./course.schema";
import { CourseDto } from "./course.dto";


@Injectable()
export default class CoursesService{

  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Campus.name) private campusModel: Model<Campus>
  ){}

  findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async createCourse(courseDTO: CourseDto): Promise<Course>{
    const campus = await this.campusModel.findOne({ campusId:courseDTO.campusId }).exec();
    if (!campus) {
      throw new NotFoundException('Campus not found');
    }
    const course = new this.courseModel({
      name:courseDTO.name,
      campus:campus
    });
    return course.save();
  }

  async findCourse(search:Record<string,string|number>){
    return await this.courseModel.findOne(search).exec();  
  }

  async findCoursesByCampusAcronym(acronym: string): Promise<Course[]> {
    const campus = await this.campusModel.findOne({ acronym }).exec();
    return await this.courseModel.find({ campus:campus }).exec();
  }
}