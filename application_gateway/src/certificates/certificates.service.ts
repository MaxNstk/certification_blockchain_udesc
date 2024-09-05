import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CertificateDTO } from './certificate.dto';
import BlockchainConnection from 'src/blockchain/blockchain.connection';
import { User } from 'src/users/user.schema';

@Injectable()
export class CertificatesService {

    async getAllCertificates(reqUser: User, ): Promise<JSON>  {
        const connection: BlockchainConnection = await BlockchainConnection.getConnection(reqUser);
        try{
            return await connection.evaluateTransaction('GetAllCertificates');
        }finally{
            connection.disconnect();
        }
    }
  
    async getCertificateByNumber(reqUser: User, certificateNumber: string): Promise<JSON>  {
        const connection: BlockchainConnection = await BlockchainConnection.getConnection(reqUser);
        try{
            return await connection.evaluateTransaction('RetrieveCompleteCertificate',certificateNumber)
        }finally{
            connection.disconnect();
        }
    }

    async createCertificate(reqUser: User, certificateDTO: CertificateDTO): Promise<JSON>  {
        const connection: BlockchainConnection = await BlockchainConnection.getConnection(reqUser);
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
            return await this.getCertificateByNumber(reqUser, certificateDTO.certificateNumber);
        } catch (error) {
            throw new HttpException(`Certificate with number ${certificateDTO.certificateNumber} already exist.`, HttpStatus.BAD_REQUEST);
        }finally{
            connection.disconnect();
        }
    }

    async updateCertificate(reqUser: User, certificateDTO: CertificateDTO, certificateNumber:string): Promise<JSON>  {
        const connection: BlockchainConnection = await BlockchainConnection.getConnection(reqUser);
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
            return await this.getCertificateByNumber(reqUser, certificateDTO.certificateNumber);         
        } catch (error) {
            throw new HttpException('Failed to retrieve certificate', HttpStatus.BAD_REQUEST);
        }finally{
            connection.disconnect();
        }
    }
  
}
