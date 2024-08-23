import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BlockchainConnection from 'src/blockchain.connection';
import { CertificateDTO } from './certificate.dto';

@Injectable()
export class CertificatesService {

    async getAllCertificates(): Promise<JSON>  {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        return await connection.evaluateTransaction('GetAllCertificates');
    }
  
    async getCertificateByNumber(certificateNumber: string): Promise<JSON>  {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        return await connection.evaluateTransaction('RetrieveCompleteCertificate',certificateNumber)
    }

    async createCertificate(certificateDTO: CertificateDTO): Promise<JSON>  {
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
            return await this.getCertificateByNumber(certificateDTO.certificateNumber);
        } catch (error) {
            throw new HttpException(`Certificate with number ${certificateDTO.certificateNumber} already exist.`, HttpStatus.BAD_REQUEST);
        }
    }

    async updateCertificate(certificateDTO: CertificateDTO, certificateNumber:string): Promise<JSON>  {
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
            return await this.getCertificateByNumber(certificateDTO.certificateNumber);         
        } catch (error) {
            throw new HttpException('Failed to retrieve certificate', HttpStatus.BAD_REQUEST);
        }
    }
  
}
