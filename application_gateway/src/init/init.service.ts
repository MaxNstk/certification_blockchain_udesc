import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as dotenv from 'dotenv';
import BlockchainConnection from 'src/blockchain/blockchain.connection';
import * as path from 'path';
import { CampusService } from 'src/campus/campus.service';
import UsersService from 'src/users/users.service';
import CoursesService from 'src/course/course.service';
import { Campus } from 'src/campus/campus.schema';
import { UserDto } from 'src/users/user.dto';
import { User } from 'src/users/user.schema';
dotenv.config();

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly campusService: CampusService,
    private readonly coursesService: CoursesService,
  ) {}

  async onModuleInit() {
    const campusList = await this.campusService.findAll();
    const courseList  = await this.coursesService.findAll();
    const userList = await this.usersService.findAll();
    if (campusList.length == 0){
      await this.createCampus();
    }
    if (courseList.length == 0){
      await this.createCourses();
    }
    if (userList.length == 0){
      await this.createUsers();
    }
    await this.initLedger();
  }
  
  async initLedger() {
    const connection: BlockchainConnection = await BlockchainConnection.getConnection(
      await this.usersService.findUserByUsername(process.env.ADMIN_USER)
    );
    try{
      const certificates = await connection.evaluateTransaction('GetAllCertificates');
      if (Array.isArray(certificates) && certificates.length === 0) {
        await connection.initLedger();
      }
    }finally{
      connection.disconnect();
    }
  }

  async createUsers(){

    const username = process.env.ADMIN_USER;
    const password = process.env.ADMIN_PASSWORD; 
    
    const publicUsername = process.env.PUBLIC_USER;
    const publicPassword = process.env.PUBLIC_PASSWORD; 
    
    try{
        await this.usersService.findUserByUsername(username);        
    }catch(e){
			if (!(e instanceof NotFoundException)){ throw e }
			else{
        await this.usersService.createUser(
          {
            username: publicUsername,
            password: publicPassword,
            fullName:"Public user",
            isCoordinator:false,
            isAdmin:false,
          } as UserDto
        ); 
				const user: User = await this.usersService.createUser(
					{
            username,
            password,
            fullName:"Admin Admin",
            isCoordinator:true,
            isAdmin:true,
            campusAcronym:"CEAVI"
          } as UserDto
				); 
			}
    }
  }

  async createCampus(){
    const cryptoPath = path.resolve(__dirname,'..', '..', '..', 'blockchain', 'network', 'organizations', 'peerOrganizations', 'udesc.local.com');    
    const campusList = [
      {
        cryptoPath: cryptoPath,
        acronym:"CEAVI",
        description:"Centro de Educação Superior do Alto Vale do Itajaí",
        certDirectoryPath : path.resolve(cryptoPath, 'users', 'userCEAVI@udesc.local.com', 'msp', 'signcerts'),
        tlsCertPath : path.resolve(cryptoPath, 'peers', 'peerCEAVI.udesc.local.com', 'tls', 'ca.crt'),
        keyDirectoryPath : path.resolve(cryptoPath, 'users', 'userCEAVI@udesc.local.com', 'msp', 'keystore'),
        peerEndpoint : 'localhost:7051',
        peerHostAlias : 'peerCEAVI.udesc.local.com'
      },
      {
        cryptoPath: cryptoPath,
        acronym: "CCT",
        description: "Centro de Ciências Tecnológicas",
        certDirectoryPath : path.resolve(cryptoPath, 'users', 'userCCT@udesc.local.com', 'msp', 'signcerts'),
        tlsCertPath : path.resolve(cryptoPath, 'peers', 'peerCCT.udesc.local.com', 'tls', 'ca.crt'),
        keyDirectoryPath : path.resolve(cryptoPath, 'users', 'userCCT@udesc.local.com', 'msp', 'keystore'),
        peerEndpoint : 'localhost:7055',
        peerHostAlias : 'peerCCT.udesc.local.com'
      },
      {
        cryptoPath: cryptoPath,
        acronym:"CEPLAN",
        description:"Centro de Educação do Planalto Norte",
        certDirectoryPath : path.resolve(cryptoPath, 'users', 'userCEPLAN@udesc.local.com', 'msp', 'signcerts'),
        tlsCertPath : path.resolve(cryptoPath, 'peers', 'peerCEPLAN.udesc.local.com', 'tls', 'ca.crt'),
        keyDirectoryPath : path.resolve(cryptoPath, 'users', 'userCEPLAN@udesc.local.com', 'msp', 'keystore'),
        peerEndpoint : 'localhost:7057',
        peerHostAlias : 'peerCEPLAN.udesc.local.com'
      },
      {
        cryptoPath: cryptoPath,
        acronym:"CESMO",
        description:"Centro de Educação Superior do Meio Oeste",
        certDirectoryPath : path.resolve(cryptoPath, 'users', 'userCESMO@udesc.local.com', 'msp', 'signcerts'),
        tlsCertPath : path.resolve(cryptoPath, 'peers', 'peerCESMO.udesc.local.com', 'tls', 'ca.crt'),
        keyDirectoryPath : path.resolve(cryptoPath, 'users', 'userCESMO@udesc.local.com', 'msp', 'keystore'),
        peerEndpoint : 'localhost:7059',
        peerHostAlias : 'peerCESMO.udesc.local.com'
      },
    ]
    for (const campi of campusList) {
      const newCampus = await this.campusService.createCampus(campi);
    }
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
    for (const campusAcronym in campusCourses) {
      const campus: Campus = await this.campusService.findCampusByAcronym(campusAcronym);
      const courses = campusCourses[campusAcronym];
      for (const name of courses) {
        const course = await this.coursesService.createCourse({
          name,
          campusId: campus.campusId,
        });
      }
    }
  } 
}
