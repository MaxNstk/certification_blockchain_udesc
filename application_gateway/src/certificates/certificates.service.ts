import { Injectable } from '@nestjs/common';
import BlockchainConnection from 'src/blockchain.connection';

@Injectable()
export class CertificatesService {

    private utf8Decoder = new TextDecoder();

    async getCertificateByNumber(certificateNumber: string): Promise<any> {

        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        console.log('\n--> Evaluate Transaction: RetrieveCompleteCertificate, function returns Certificate attributes');
        const resultBytes = await connection.getContract().evaluateTransaction('RetrieveCompleteCertificate', certificateNumber);
        const resultJson = this.utf8Decoder.decode(resultBytes);
        const result: unknown = JSON.parse(resultJson);
        console.log('*** Result:', result);

    }
    async getAllCertificates(): Promise<any> {
        const connection: BlockchainConnection = await BlockchainConnection.getInstance();
        console.log('\n--> Evaluate Transaction: GetAllCertificates, function returns all the current Certificates on the ledger');
        const resultBytes = await connection.getContract().evaluateTransaction('GetAllCertificates');
        const resultJson = this.utf8Decoder.decode(resultBytes);
        const result: unknown = JSON.parse(resultJson);
        console.log('*** Result:', result);
        return result
    }
}
