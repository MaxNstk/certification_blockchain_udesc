import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CampusService } from 'src/campus/campus.service';

@Injectable()
export class CampusInitService implements OnModuleInit {
  constructor(
    private readonly campusService: CampusService
  ) {}

  async onModuleInit() {
    try{
        await this.campusService.findCampusByAcronym("CEAVI");        
    }catch(e){
			if (!(e instanceof NotFoundException)){ throw e }
			else{
				await this.createCampus(); 
			}
    }
  }

  async createCampus(){
    const campus = [
      {
          "campusAcronym":"CEAVI",
          "campusName":"Centro de Educação Superior do Alto Vale do Itajaí",
      },
      {
          "campusAcronym": "CCT",
          "campusName": "Centro de Ciências Tecnológicas",
      },
      {
          "campusAcronym":"CEPLAN",
          "campusName":"Centro de Educação do Planalto Norte",
      },
      {
          "campusAcronym":"CESMO",
          "campusName":"Centro de Educação Superior do Meio Oeste",
      }
    ]
    campus.forEach(async campi => {
      await this.campusService.createCampus(campi.campusAcronym, campi.campusName)
    });
  }
}
