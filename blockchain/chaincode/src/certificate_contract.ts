import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Certificate} from './certificate';
import {CAMPI} from './campusInfo'

import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';

@Info({title: 'CertificateStorage', description: 'Smart contract for storing certificates'})
export class CertificateStorageContract extends Contract {

    public getClientId(ctx: Context): string{
        const clientId: string|null = ctx.clientIdentity.getAttributeValue('hf.EnrollmentID');
        if (!clientId){
            throw new Error(`The clientId is not defined`);
        }
        return clientId;
    }

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        console.info("Initing ledger");
        const certificates: Certificate[] = [
            { 
                certificateNumber: "1", certificateEmissionDate: "2024-08-04T12:00:00Z", certificateCourse: "Engenharia de Software",
                certificateStatus: "valid",  ownerName: "Max Starke",  ownerRG: "987654321", ownerBirthDate: "2002-05-29T00:00:00Z",  
                ownerBirthState: "Santa Catarina",  campusName: "Centro de Educação do Alto Vale do Itajaí",  campusAcronym: "CEAVI",
                campusDirector: "Marino",  universityPresidentName: "Dilmar Baretta",  universityCertificateCoordinator: "Elaine", 
                hasCompletedAllSubjects: true,  hasSentAllRequiredDocuments: true,  wentToDegreeGranting: true, note: "Certificado emitido sem pendências.",  
                creationUser: "Maxuel", creationDate: "2002-05-29T00:00:00Z", updateUser: "InitLedger Function", updateDate: "2002-05-29T00:00:00Z"
            },
            {
                certificateNumber: "2", certificateEmissionDate: "2024-08-04T12:00:00Z", certificateCourse: "Engenharia de Software",  certificateStatus: "revoked", 
                ownerName: "João Krieger", ownerRG: "987654321",ownerBirthDate: "2002-05-29T00:00:00Z", ownerBirthState: "Santa Catarina", campusName: "Centro de Educação do Alto Vale do Itajaí", 
                campusAcronym: "CEAVI", campusDirector: "Marino", universityPresidentName: "Dilmar Baretta", universityCertificateCoordinator: "Elaine",hasCompletedAllSubjects: true,
                hasSentAllRequiredDocuments: true,  wentToDegreeGranting: false,  note: "João faltou na cerimônia, é um pangaré" , creationUser: "Jones", creationDate: "2002-05-29T00:00:00Z",
                updateUser: "InitLedger Function", updateDate: "2002-05-29T00:00:00Z"                
            }
        ];
        for (const certificate of certificates) {
            await ctx.stub.putState(certificate.certificateNumber, Buffer.from(stringify(sortKeysRecursive(certificate))));
            console.info(`Certificate ${certificate.certificateNumber} initialized`);
        }
    }

    @Transaction()
    public async CreateCertificate(ctx: Context,
        certificateNumber: string, certificateEmissionDate: string, certificateCourse: string, certificateStatus: 'valid' | 'revoked', ownerName: string,
        ownerRG: string, ownerBirthDate: string, ownerBirthState: string, campusDirector: string, universityPresidentName: string,
        universityCertificateCoordinator: string, hasCompletedAllSubjects: boolean, hasSentAllRequiredDocuments: boolean, wentToDegreeGranting: boolean,
        note: string, user: string, dateString: string
    ): Promise<string> {
        console.info("creating certificate with number "+certificateNumber);
        const exists = await this.CertificateExists(ctx, certificateNumber);
        if (exists) {
            throw new Error(`The certificate ${certificateNumber} already exists`);
        }
        const clientId = this.getClientId(ctx);
        try{
            const certificate: Certificate = {
                certificateNumber, certificateEmissionDate, certificateCourse, certificateStatus,
                ownerName, ownerRG, ownerBirthDate, ownerBirthState,
                campusName: CAMPI[clientId].campusName, campusAcronym: CAMPI[clientId].campusAcronym,
                campusDirector, universityPresidentName, universityCertificateCoordinator, hasCompletedAllSubjects,
                hasSentAllRequiredDocuments, wentToDegreeGranting, note, creationUser: user,
                creationDate: dateString, updateUser: user, updateDate: dateString
            };
            const stringContent = stringify(sortKeysRecursive(certificate));
            await ctx.stub.putState(certificateNumber, Buffer.from(stringContent));
            return `Certificate ${certificateNumber} created`
        }catch(e){
            const response = `Error creating certificate: ${e}` 
            console.info(response);
            return response;        
        }            
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
    public async RetrieveCertificate(ctx: Context, certificateNumber: string): Promise<string> {
        console.info("Retrieving complete certificate with number "+certificateNumber);
        const assetJSON = await ctx.stub.getState(certificateNumber);
        if (assetJSON.length === 0) {
            throw new Error(`The certificate ${certificateNumber} does not exist`);
        }
        return assetJSON.toString();
    }

    @Transaction(false)
    public async GetCertificateHistory(ctx: Context, certificateNumber: string): Promise<string> {
        console.info(`Fetching history for certificate with number: ${certificateNumber}`);
        const iterator = await ctx.stub.getHistoryForKey(certificateNumber);
        const allResults = [];
    
        let result = await iterator.next();
        while (!result.done) {
            const record = {
                txId: result.value.txId,
                isDelete: result.value.isDelete,
                value: JSON.parse(result.value.value.toString()),
                timestamp: result.value.timestamp,
            };
            allResults.push(record);
            result = await iterator.next();
        }
        await iterator.close();
        return JSON.stringify(allResults);
    }

    @Transaction()
    public async UpdateCertificate(ctx: Context,
        certificateNumber: string, certificateEmissionDate: string, certificateCourse: string, certificateStatus: 'valid' | 'revoked', ownerName: string,
        ownerRG: string, ownerBirthDate: string, ownerBirthState: string, campusDirector: string, universityPresidentName: string,
        universityCertificateCoordinator: string, hasCompletedAllSubjects: boolean, hasSentAllRequiredDocuments: boolean, 
        wentToDegreeGranting: boolean, note: string, user: string, dateString: string
    ): Promise<string> {
        console.info("updating certificate with number "+certificateNumber);
        const exists = await this.CertificateExists(ctx, certificateNumber);
        if (!exists) {
            throw new Error(`The certificate ${certificateNumber} does not exist`);
        }
        try{
            const clientId = this.getClientId(ctx);
            const currentCertificate: Certificate = JSON.parse(await this.RetrieveCertificate(ctx, certificateNumber)) as Certificate;       
            const updatedCertificate: Certificate = {
                certificateNumber, certificateEmissionDate, certificateCourse, certificateStatus, ownerName, ownerRG,
                ownerBirthDate, ownerBirthState, campusName: CAMPI[clientId].campusName, campusAcronym: CAMPI[clientId].campusAcronym, 
                campusDirector, universityPresidentName, universityCertificateCoordinator,hasCompletedAllSubjects,hasSentAllRequiredDocuments,wentToDegreeGranting,
                note, creationUser: currentCertificate.creationUser, creationDate: currentCertificate.creationDate, updateUser: user, updateDate: dateString
            };
            const stringContent = stringify(sortKeysRecursive(updatedCertificate));
            await ctx.stub.putState(certificateNumber, Buffer.from(stringContent));
            return `Certificate ${certificateNumber} updated`
        }catch(e){
            const response = `Error updating certificate: ${e}` 
            console.info(response);
            return response;
        }
    }

    @Transaction(false)
    @Returns('string')
    public async GetAllCertificates(ctx: Context): Promise<string> {

        const clientMSPId = ctx.clientIdentity.getMSPID();
        if (clientMSPId == 'PublicMSP'){
            throw new Error(`Public organization has't permission to list certificates`);
        }

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


