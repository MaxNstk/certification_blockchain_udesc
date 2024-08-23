import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Contract } from '@hyperledger/fabric-gateway';
import { TextDecoder } from 'util';
import BlockchainConnection from './blockchain.connection';
const utf8Decoder = new TextDecoder();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

async function main(): Promise<void> {
  //displayInputParameters();

  const connection: BlockchainConnection = await BlockchainConnection.getInstance();

  try {
      const contract = connection.getContract();
      await initLedger(contract);
      bootstrap();
  } catch(e){
    console.log(e);
  }
}
main().catch((error: unknown) => {
    console.error('******** FAILED to run the application:', error);
    process.exitCode = 1;
});

async function initLedger(contract: Contract): Promise<void> {
    console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of Certificates on the ledger');

    await contract.submitTransaction('InitLedger');

    console.log('*** Transaction committed successfully');
}

async function createCertificate(contract: Contract): Promise<void> {
    console.log('\n--> Submit Transaction: CreateCertificate');

    await contract.submitTransaction(
        'CreateCertificate',
        '3', 
        '2024-08-04T12:00:00Z',
        'Computer Science', 
        'valid', 
        'Alice Smith', 
        '123456789', 
        '1990-05-15T00:00:00Z',
        'Santa Catarina', 
        'Centro de Ciências Tecnológicas', 
        'CEAVI', 
        'Prof. João Santos', 
        'Reitora Maria Oliveira', 
        'Coordenador Carlos Pereira',
        'true', 
        'true', 
        'true', 
        'Certificado emitido sem pendências.',
        'Caue',
        new Date().toISOString(),
    );
    console.log('*** Transaction committed successfully');
}

async function updateCertificate(contract: Contract): Promise<void> {

    await contract.submitTransaction(
        'UpdateCertificate',
        '1', // certificateNumber
        '2024-08-04T12:00:00Z', // certificateEmissionDate
        'Computer Science', // certificateCourse
        'valid', // certificateStatus
        'Max Starke', // ownerName
        '123456789', // ownerRG
        '1990-05-15T00:00:00Z', // ownerBirthDate
        'Santa Catarina', // ownerBirthState
        'Centro de Ciências Tecnológicas', // campusName
        'CEAVI', // campusAcronym
        'Mudou diretor', // campusDirector
        'Presidente', // universityPresidentName
        'Coordenador Carlos Pereira', // universityCertificateCoordinator
        'true', // hasCompletedAllSubjects
        'true', // hasSentAllRequiredDocuments
        'true', // wentToDegreeGranting
        'Certificado emitido sem pendências.', // note
        'Davi',
        new Date().toISOString(),
    );
    console.log('*** Transaction committed successfully');
}



