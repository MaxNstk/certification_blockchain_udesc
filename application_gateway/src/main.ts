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

      // Initialize a set of Certificate data on the ledger using the chaincode 'InitLedger' function.
      await initLedger(contract);

      // Return all the current Certificates on the ledger.
      await getAllCertificates(contract);

      // Create a new Certificate on the ledger.
      await createCertificate(contract);

      // Get the Certificate details by CertificateID.
      await RetrieveCompleteCertificateByNumber(contract, "1");

      // Create a new Certificate on the ledger.
      await updateCertificate(contract);

      // Return all the current Certificates on the ledger.
      await getAllCertificates(contract);

      bootstrap();

  } catch(e){
    console.log(e);
  }
  finally {
    connection.disconnect();
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

async function getAllCertificates(contract: Contract): Promise<void> {
    console.log('\n--> Evaluate Transaction: GetAllCertificates, function returns all the current Certificates on the ledger');

    const resultBytes = await contract.evaluateTransaction('GetAllCertificates');

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: unknown = JSON.parse(resultJson);
    console.log('*** Result:', result);
}

async function createCertificate(contract: Contract): Promise<void> {
    console.log('\n--> Submit Transaction: CreateCertificate');

    await contract.submitTransaction(
        'CreateCertificate',
        '3', // certificateNumber
        '2024-08-04T12:00:00Z', // certificateEmissionDate
        'Computer Science', // certificateCourse
        'valid', // certificateStatus
        'Alice Smith', // ownerName
        '123456789', // ownerRG
        '1990-05-15T00:00:00Z', // ownerBirthDate
        'Santa Catarina', // ownerBirthState
        'Centro de Ciências Tecnológicas', // campusName
        'CEAVI', // campusAcronym
        'Prof. João Santos', // campusDirector
        'Reitora Maria Oliveira', // universityPresidentName
        'Coordenador Carlos Pereira', // universityCertificateCoordinator
        'true', // hasCompletedAllSubjects
        'true', // hasSentAllRequiredDocuments
        'true', // wentToDegreeGranting
        'Certificado emitido sem pendências.', // note
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


async function RetrieveCompleteCertificateByNumber(contract: Contract, certificateNumber:string): Promise<void> {
    console.log('\n--> Evaluate Transaction: RetrieveCompleteCertificate, function returns Certificate attributes');

    const resultBytes = await contract.evaluateTransaction('RetrieveCompleteCertificate', certificateNumber);

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: unknown = JSON.parse(resultJson);
    console.log('*** Result:', result);
}
