/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Certificate} from './certificate';

@Info({title: 'AssetTransfer', description: 'Smart contract for trading assets'})
export class AssetTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const certificates: Certificate[] = [
            {
                certificateNumber: "1",
                certificateEmissionDate: "2024-08-04T12:00:00Z",
                certificateCourse: "Engenharia de Software", 
                certificateStatus: "valid", 
                ownerName: "Max Starke", 
                ownerRG: "987654321",
                ownerBirthDate: "2002-05-29T00:00:00Z", 
                ownerBirthState: "Santa Catarina", 
                campusName: "Centro de Educação do Alto Vale do Itajaí", 
                campusAcronym: "CEAVI", 
                campusDirector: "Marino", 
                universityPresidentName: "Dilmar Baretta", 
                universityCertificateCoordinator: "Elaine",
                hasCompletedAllSubjects: true, 
                hasSentAllRequiredDocuments: true, 
                wentToDegreeGranting: true,
                note: "Certificado emitido sem pendências." ,
                creationUser: 'Caue Lopes',
                creationDate: new Date().toISOString(),
                updateUser: 'Davi Lemes',
                updateDate: new Date().toISOString(),
            },
            {
                certificateNumber: "2",
                certificateEmissionDate: "2024-08-04T12:00:00Z",
                certificateCourse: "Engenharia de Software", 
                certificateStatus: "revoked", 
                ownerName: "João Krieger", 
                ownerRG: "987654321",
                ownerBirthDate: "2002-05-29T00:00:00Z", 
                ownerBirthState: "Santa Catarina", 
                campusName: "Centro de Educação do Alto Vale do Itajaí", 
                campusAcronym: "CEAVI", 
                campusDirector: "Marino", 
                universityPresidentName: "Dilmar Baretta", 
                universityCertificateCoordinator: "Elaine",
                hasCompletedAllSubjects: true,
                hasSentAllRequiredDocuments: true, 
                wentToDegreeGranting: false, 
                note: "João faltou na cerimônia, é um pangaré" ,
                creationUser: 'Caue Lopes',
                creationDate: new Date().toISOString(),
                updateUser: 'Davi Lemes',
                updateDate: new Date().toISOString(),                
            }
        ];
        for (const certificate of certificates) {
            console.info(`Certificate ${certificate.certificateNumber} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    @Transaction()
    public async CreateCertificate(ctx: Context,
        certificateNumber: string,
        certificateEmissionDate: string,
        certificateCourse: string,
        certificateStatus: 'valid' | 'revoked',
        ownerName: string,
        ownerRG: string,
        ownerBirthDate: string,
        ownerBirthState: string,
        campusName: string,
        campusAcronym: string,
        campusDirector: string,
        universityPresidentName: string,
        universityCertificateCoordinator: string,
        hasCompletedAllSubjects: boolean,
        hasSentAllRequiredDocuments: boolean,
        wentToDegreeGranting: boolean,
        note: string,
        user: string
    ): Promise<void> {
        const exists = await this.CertificateExists(ctx, certificateNumber);
        if (exists) {
            throw new Error(`The certificate ${certificateNumber} already exists`);
        }
   
        const date = new Date().toISOString();

        // Create the asset object with the new fields
        const certificate: Certificate = {
            certificateNumber,
            certificateEmissionDate,
            certificateCourse,
            certificateStatus,
            ownerName,
            ownerRG,
            ownerBirthDate,
            ownerBirthState,
            campusName,
            campusAcronym,
            campusDirector,
            universityPresidentName,
            universityCertificateCoordinator,
            hasCompletedAllSubjects,
            hasSentAllRequiredDocuments,
            wentToDegreeGranting,
            note,
            creationUser:user,
            creationDate:date,
            updateUser:user,
            updateDate:date,
        };
        await ctx.stub.putState(certificateNumber, Buffer.from(stringify(sortKeysRecursive(certificate))));
    }

    @Transaction(false)
    public async RetrieveCertificate(ctx: Context, certificateNumber: string): Promise<Certificate> {
        const assetJSON = await ctx.stub.getState(certificateNumber); // get the asset from chaincode state
        if (assetJSON.length === 0) {
            throw new Error(`The certificate ${certificateNumber} does not exist`);
        }
        return JSON.parse(assetJSON.toString()) as Certificate;
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    @Transaction()
    public async UpdateCertificate(ctx: Context,
        id: string,
        certificateNumber: string,
        certificateEmissionDate: string,
        certificateCourse: string,
        certificateStatus: 'valid' | 'revoked',
        ownerName: string,
        ownerRG: string,
        ownerBirthDate: string,
        ownerBirthState: string,
        campusName: string,
        campusAcronym: string,
        campusDirector: string,
        universityPresidentName: string,
        universityCertificateCoordinator: string,
        hasCompletedAllSubjects: boolean,
        hasSentAllRequiredDocuments: boolean,
        wentToDegreeGranting: boolean,
        note: string,
        updateUser: string,
    ): Promise<void> {
        const currentCertificate = await this.RetrieveCertificate(ctx, certificateNumber);
        
        const updatedCertificate: Certificate = {
            certificateNumber,
            certificateEmissionDate,
            certificateCourse,
            certificateStatus,
            ownerName,
            ownerRG,
            ownerBirthDate,
            ownerBirthState,
            campusName,
            campusAcronym,
            campusDirector,
            universityPresidentName,
            universityCertificateCoordinator,
            hasCompletedAllSubjects,
            hasSentAllRequiredDocuments,
            wentToDegreeGranting,
            note,
            updateUser,
            updateDate: new Date().toISOString(),
            creationUser:currentCertificate.creationUser,
            creationDate:currentCertificate.creationDate
        };
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedCertificate))));
    }

    // DeleteCertificate deletes an given asset from the world state.
    @Transaction()
    public async DeleteCertificate(ctx: Context, certificateNumber: string): Promise<void> {
        const exists = await this.CertificateExists(ctx, certificateNumber);
        if (!exists) {
            throw new Error(`The certificate ${certificateNumber} does not exist`);
        }
        return ctx.stub.deleteState(certificateNumber);
    }

    // CertificateExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    private async CertificateExists(ctx: Context, certificateNumber: string): Promise<boolean> {
        try{
            this.RetrieveCertificate(ctx, certificateNumber);
            return true;
        }catch(error){
            return false
        }        
    }

    @Transaction(false)
    @Returns('string')
    public async GetAllCertificates(ctx: Context): Promise<string> {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue) as Certificate;
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}
