import { Injectable } from '@nestjs/common';
import BlockchainConnection from 'src/blockchain.connection';

@Injectable()
export class CertificatesService {

    async getCertificateByNumber(certificateNumber: string): Promise<any> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        return await connection.evaluateTransaction('RetrieveCompleteCertificate',certificateNumber)
    }

    async getAllCertificates(): Promise<any> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        return await connection.evaluateTransaction('GetAllCertificates');
    }
}
