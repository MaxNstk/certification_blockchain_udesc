import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import CoursesService from "./course.service";
import { Course } from "./course.schema";


@Controller('courses')
export class CoursesController{

    constructor(private readonly courseService: CoursesService) {}

    @Get('campus/:campusId')
    async getUser(@Param('campusId') campusId: string): Promise<Course[]>{
        return await this.courseService.findCoursesByCampus(campusId);
    }

    @Get()
    async getAll(): Promise<Course[]>{
        return await this.courseService.findAll();
    }

}