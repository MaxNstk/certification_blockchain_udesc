import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as path from 'path';
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
    const cryptoPath = path.resolve(__dirname,'..', '..', '..', 'blockchain', 'network', 'organizations', 'peerOrganizations', 'udesc.local.com');    
    const campus = [
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
    campus.forEach(async campi => {
      await this.campusService.createCampus(campi)
    });
  }
}
