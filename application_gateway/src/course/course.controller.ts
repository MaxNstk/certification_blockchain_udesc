import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import CoursesService from "./course.service";
import { Course } from "./course.schema";


@Controller('courses')
export class CoursesController{

    constructor(private readonly courseService: CoursesService) {}

    @Get('campus/:acronym')
    async getUser(@Param('acronym') acronym: string): Promise<Course[]>{
        
        return await this.courseService.findCoursesByCampusAcronym(acronym);
    }

    @Get()
    async getAll(): Promise<Course[]>{
        return await this.courseService.findAll();
    }

}