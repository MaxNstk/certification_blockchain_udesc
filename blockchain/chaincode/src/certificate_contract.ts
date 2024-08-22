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
                note: "Certificado emitido sem pendências.", 
                creationUser: "Maxuel",
                creationDate: "2002-05-29T00:00:00Z",
                updateUser: "Jones",
                updateDate: "2002-05-29T00:00:00Z"
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
                creationUser: "Jones",
                creationDate: "2002-05-29T00:00:00Z",
                updateUser: "Maxuel",
                updateDate: "2002-05-29T00:00:00Z"                
            }
        ];

        for (const certificate of certificates) {
            await ctx.stub.putState(certificate.certificateNumber, Buffer.from(stringify(sortKeysRecursive(certificate))));
            console.info(`Certificate ${certificate.certificateNumber} initialized`);
        }
    }

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
        user: string,
        dateString: string
    ): Promise<void> {
        console.info("creating certificate with number "+certificateNumber);
        const exists = await this.CertificateExists(ctx, certificateNumber);
        if (exists) {
            throw new Error(`The certificate ${certificateNumber} already exists`);
        }
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
            creationUser: user,
            creationDate: dateString,
            updateUser: user,
            updateDate: dateString
        };
        await ctx.stub.putState(certificateNumber, Buffer.from(stringify(sortKeysRecursive(certificate))));
    }

    @Transaction(false)
    public async RetrieveCompleteCertificate(ctx: Context, certificateNumber: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(certificateNumber); // get the asset from chaincode state
        if (assetJSON.length === 0) {
            throw new Error(`The certificate ${certificateNumber} does not exist`);
        }
        return assetJSON.toString();
    }

    @Transaction()
    public async UpdateCertificate(ctx: Context,
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
        user: string,
        dateString: string
    ): Promise<void> {
        const exists = await this.CertificateExists(ctx, certificateNumber);
        if (!exists) {
            throw new Error(`The certificate ${certificateNumber} does not exist`);
        }
        const currentCertificate: Certificate = JSON.parse(await this.RetrieveCompleteCertificate(ctx, certificateNumber)) as Certificate;
        
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
            creationUser: currentCertificate.creationUser,
            creationDate: currentCertificate.creationDate,
            updateUser: user,
            updateDate: dateString
        };
        await ctx.stub.putState(certificateNumber, Buffer.from(stringify(sortKeysRecursive(updatedCertificate))));
    }

    @Transaction()
    public async DeleteCertificate(ctx: Context, certificateNumber: string): Promise<void> {
        const exists = await this.CertificateExists(ctx, certificateNumber);
        if (!exists) {
            throw new Error(`The certificate ${certificateNumber} does not exist`);
        }
        return ctx.stub.deleteState(certificateNumber);
    }

    @Transaction(false)
    @Returns('boolean')
    public async CertificateExists(ctx: Context, certificateNumber: string): Promise<boolean> {
        console.info(`Checking if certificate with number ${certificateNumber} exists`);
        const assetJSON = await ctx.stub.getState(certificateNumber);
        console.info(`Response exists: ${assetJSON.toString()}`);
        return assetJSON.length > 0;
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