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
                note: "Certificado emitido sem pendências." 
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
                note: "João faltou na cerimônia, é um pangaré" 
            }
        ];

        for (const certificate of certificates) {
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(certificate.certificateNumber, Buffer.from(stringify(sortKeysRecursive(certificate))));
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
        note: string
    ): Promise<void> {
        const id = certificateNumber;
        // Check if the asset already exists
        const exists = await this.CertificateExists(ctx, certificateNumber);
        if (exists) {
            throw new Error(`The certificate ${id} already exists`);
        }
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
            note
        };
        // Insert data in deterministic order
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(certificate))));
    }

    // ReadAsset returns the asset stored in the world state with given id.
    @Transaction(false)
    public async ReadCertificate(ctx: Context, id: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (assetJSON.length === 0) {
            throw new Error(`The certificate ${id} does not exist`);
        }
        return assetJSON.toString();
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
        note: string
    ): Promise<void> {
        const exists = await this.CertificateExists(ctx, id);
        if (!exists) {
            throw new Error(`The certificate ${id} does not exist`);
        }
        // Update the asset with new data
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
            note
        };
        // Insert data in deterministic order
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedCertificate))));
    }

    // DeleteCertificate deletes an given asset from the world state.
    @Transaction()
    public async DeleteCertificate(ctx: Context, id: string): Promise<void> {
        const exists = await this.CertificateExists(ctx, id);
        if (!exists) {
            throw new Error(`The certificate ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // CertificateExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async CertificateExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON.length > 0;
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAllCertificates(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
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
