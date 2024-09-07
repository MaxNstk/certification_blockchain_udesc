import { Injectable, OnModuleInit } from '@nestjs/common';
import { Campus } from 'src/campus/campus.schema';
import { CampusService } from 'src/campus/campus.service';
import CoursesService from './course.service';

@Injectable()
export class CourseInitService implements OnModuleInit {
  constructor(
    private readonly campusService: CampusService,
    private readonly courseService: CoursesService
  ) {}

  async onModuleInit() {
    if ((await this.courseService.findAll()).length != 0){ 
      return;
    }
    await this.createCourses();
  }

  async createCourses(){

    const campusCourses:Record<string, string[]> = {
        "CEAVI":[ 
            "Ciências Contábeis",
            "Engenharia Civil",
            "Engenharia de Software",
            "Engenharia Sanitária",
        ],
        "CCT":[
            "Ciência da Computação",
            "Engenharia Civil",
            "Engenharia de Produção e Sistemas",
            "Engenharia Elétrica",
            "Engenharia Mecânica",
            "Licenciatura em Física",
            "Licenciatura em Matemática",
            "Licenciatura em Química",
            "Tecnologia em Análise e Desenvolvimento de Sistemas",
        ],
        "CEPLAN":[
            "Engenharia de Produção - Habilitação Mecânica",
            "Sistemas de Informação",
        ],
        "CESMO":[
            "Sistemas de Informação",
        ]
    };
    for (const campusAcronym in campusCourses){

        const campus:Campus = await this.campusService.findCampusByAcronym(campusAcronym);
        const courses = campusCourses[campusAcronym];

        courses.forEach(async name => {
            await this.courseService.createCourse({
                name,
                campusId:campus.campusId
            })
        });
    }
  }
}
