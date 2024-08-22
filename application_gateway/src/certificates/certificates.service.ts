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

    async createCertificate(certificateDTO: CertificateDTO): Promise<void> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        certificateDTO = new CertificateDTO(certificateDTO);
        return await connection.evaluateTransaction('CreateCertificate',
            ...[...certificateDTO.toTransactionFormat(),'UsuarioSessao',new Date().toISOString(),
            ]
        );
    }

    async updateCertificate(certificateDTO: CertificateDTO): Promise<void> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        return await connection.evaluateTransaction('UpdateCertificate',
            ...[...certificateDTO.toTransactionFormat(),'UsuarioSessao',new Date().toISOString(),
            ]
        );
    }
  
}
