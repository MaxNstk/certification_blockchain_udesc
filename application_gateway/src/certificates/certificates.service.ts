import { Injectable } from '@nestjs/common';
import BlockchainConnection from 'src/blockchain.connection';
import { CertificateDTO } from './certificate.dto';

@Injectable()
export class CertificatesService {

    async getAllCertificates(): Promise<any> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        return await connection.evaluateTransaction('GetAllCertificates');
    }
  
    async getCertificateByNumber(certificateNumber: string): Promise<any> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        return await connection.evaluateTransaction('RetrieveCompleteCertificate',certificateNumber)
    }

    async createCertificate(certificateDTO: CertificateDTO): Promise<any> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        try{
            await connection.getContract().submitTransaction(  
                'CreateCertificate',
                certificateDTO.certificateNumber,
                new Date(certificateDTO.certificateEmissionDate).toISOString(),
                certificateDTO.certificateCourse,
                certificateDTO.certificateStatus,
                certificateDTO.ownerName,
                certificateDTO.ownerRG,
                new Date(certificateDTO.ownerBirthDate).toISOString(),
                certificateDTO.ownerBirthState,
                certificateDTO.campusName,
                certificateDTO.campusAcronym,
                certificateDTO.campusDirector,
                certificateDTO.universityPresidentName,
                certificateDTO.universityCertificateCoordinator,
                certificateDTO.hasCompletedAllSubjects.toString(),
                certificateDTO.hasSentAllRequiredDocuments.toString(),
                certificateDTO.wentToDegreeGranting.toString(),
                certificateDTO.note,
                'UsuarioSessao',
                new Date().toISOString(),
            );
            return await connection.evaluateTransaction('RetrieveCompleteCertificate',certificateDTO.certificateNumber)         
        } catch (error) {
            console.log('*** Successfully caught the error: \n', error);
        }
    }

    async updateCertificate(certificateDTO: CertificateDTO, certificateNumber:string): Promise<void> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        try{
            await connection.getContract().submitTransaction(  
                'UpdateCertificate',
                certificateNumber,
                new Date(certificateDTO.certificateEmissionDate).toISOString(),
                certificateDTO.certificateCourse,
                certificateDTO.certificateStatus,
                certificateDTO.ownerName,
                certificateDTO.ownerRG,
                new Date(certificateDTO.ownerBirthDate).toISOString(),
                certificateDTO.ownerBirthState,
                certificateDTO.campusName,
                certificateDTO.campusAcronym,
                certificateDTO.campusDirector,
                certificateDTO.universityPresidentName,
                certificateDTO.universityCertificateCoordinator,
                certificateDTO.hasCompletedAllSubjects.toString(),
                certificateDTO.hasSentAllRequiredDocuments.toString(),
                certificateDTO.wentToDegreeGranting.toString(),
                certificateDTO.note,
                'UsuarioSessao',
                new Date().toISOString(),
            );
            return await connection.evaluateTransaction('RetrieveCompleteCertificate',certificateDTO.certificateNumber)         
        } catch (error) {
            console.log('*** Successfully caught the error: \n', error);
        }
    }
  
}
