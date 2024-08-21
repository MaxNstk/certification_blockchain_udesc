/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { TextDecoder } from 'util';

const channelName = envOrDefault('CHANNEL_NAME', 'certificationchannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'certificatesCC');
const mspId = envOrDefault('MSP_ID', 'UdescMSP');

// Path to crypto materials.
const cryptoPath = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '..', '..','blockchain', 'network', 'organizations', 'peerOrganizations', 'udesc.local.com'));

// Path to user private key directory.
const keyDirectoryPath = envOrDefault('KEY_DIRECTORY_PATH', path.resolve(cryptoPath, 'users', 'userCEAVI@udesc.local.com', 'msp', 'keystore'));

// Path to user certificate directory.
const certDirectoryPath = envOrDefault('CERT_DIRECTORY_PATH', path.resolve(cryptoPath, 'users', 'userCEAVI@udesc.local.com', 'msp', 'signcerts'));

// Path to peer tls certificate.
const tlsCertPath = envOrDefault('TLS_CERT_PATH', path.resolve(cryptoPath, 'peers', 'peerCEAVI.udesc.local.com', 'tls', 'ca.crt'));

// Gateway peer endpoint.
const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');

// Gateway peer SSL host name override.
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peerCEAVI.udesc.local.com');

const utf8Decoder = new TextDecoder();

async function main(): Promise<void> {
    displayInputParameters();

    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = await newGrpcConnection();

    const gateway = connect({
        client,
        identity: await newIdentity(),
        signer: await newSigner(),
        // Default timeouts for different gRPC calls
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 }; // 1 minute
        },
    });

    try {
        // Get a network instance representing the channel where the smart contract is deployed.
        const network = gateway.getNetwork(channelName);

        // Get the smart contract from the network.
        const contract = network.getContract(chaincodeName);

        // Initialize a set of Certificate data on the ledger using the chaincode 'InitLedger' function.
        await initLedger(contract);

        // Return all the current Certificates on the ledger.
        await getAllCertificates(contract);

        // Create a new Certificate on the ledger.
        await createCertificate(contract);

        // Get the Certificate details by CertificateID.
        await RetrieveCompleteCertificateByNumber(contract);

        // Create a new Certificate on the ledger.
        await updateCertificate(contract);

        // Return all the current Certificates on the ledger.
        await getAllCertificates(contract);

    } finally {
        gateway.close();
        client.close();
    }
}

main().catch((error: unknown) => {
    console.error('******** FAILED to run the application:', error);
    process.exitCode = 1;
});

async function newGrpcConnection(): Promise<grpc.Client> {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': peerHostAlias,
    });
}

async function newIdentity(): Promise<Identity> {
    const certPath = await getFirstDirFileName(certDirectoryPath);
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}

async function getFirstDirFileName(dirPath: string): Promise<string> {
    const files = await fs.readdir(dirPath);
    const file = files[0];
    if (!file) {
        throw new Error(`No files in directory: ${dirPath}`);
    }
    return path.join(dirPath, file);
}

async function newSigner(): Promise<Signer> {
    const keyPath = await getFirstDirFileName(keyDirectoryPath);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

async function initLedger(contract: Contract): Promise<void> {
    console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of Certificates on the ledger');

    await contract.submitTransaction('InitLedger');

    console.log('*** Transaction committed successfully');
}

async function getAllCertificates(contract: Contract): Promise<void> {
    console.log('\n--> Evaluate Transaction: GetAllCertificates, function returns all the current Certificates on the ledger');

    const resultBytes = await contract.evaluateTransaction('GetAllCertificates');

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: unknown = JSON.parse(resultJson);
    console.log('*** Result:', result);
}

async function createCertificate(contract: Contract): Promise<void> {
    console.log('\n--> Submit Transaction: CreateCertificate');

    await contract.submitTransaction(
        'CreateCertificate',
        '3', // certificateNumber
        '2024-08-04T12:00:00Z', // certificateEmissionDate
        'Computer Science', // certificateCourse
        'valid', // certificateStatus
        'Alice Smith', // ownerName
        '123456789', // ownerRG
        '1990-05-15T00:00:00Z', // ownerBirthDate
        'Santa Catarina', // ownerBirthState
        'Centro de Ciências Tecnológicas', // campusName
        'CEAVI', // campusAcronym
        'Prof. João Santos', // campusDirector
        'Reitora Maria Oliveira', // universityPresidentName
        'Coordenador Carlos Pereira', // universityCertificateCoordinator
        'true', // hasCompletedAllSubjects
        'true', // hasSentAllRequiredDocuments
        'true', // wentToDegreeGranting
        'Certificado emitido sem pendências.', // note
        'Caue',
        new Date().toISOString(),
    );
    console.log('*** Transaction committed successfully');
}

async function updateCertificate(contract: Contract): Promise<void> {

    await contract.submitTransaction(
        'UpdateCertificate',
        '1', // certificateNumber
        '2024-08-04T12:00:00Z', // certificateEmissionDate
        'Computer Science', // certificateCourse
        'valid', // certificateStatus
        'Max Starke', // ownerName
        '123456789', // ownerRG
        '1990-05-15T00:00:00Z', // ownerBirthDate
        'Santa Catarina', // ownerBirthState
        'Centro de Ciências Tecnológicas', // campusName
        'CEAVI', // campusAcronym
        'Mudou diretor', // campusDirector
        'Presidente', // universityPresidentName
        'Coordenador Carlos Pereira', // universityCertificateCoordinator
        'true', // hasCompletedAllSubjects
        'true', // hasSentAllRequiredDocuments
        'true', // wentToDegreeGranting
        'Certificado emitido sem pendências.', // note
        'Davi',
        new Date().toISOString(),
    );
    console.log('*** Transaction committed successfully');
}


async function RetrieveCompleteCertificateByNumber(contract: Contract): Promise<void> {
    console.log('\n--> Evaluate Transaction: RetrieveCompleteCertificate, function returns Certificate attributes');

    const resultBytes = await contract.evaluateTransaction('RetrieveCompleteCertificate', "1");

    const resultJson = utf8Decoder.decode(resultBytes);
    const result: unknown = JSON.parse(resultJson);
    console.log('*** Result:', result);
}

/**
 * envOrDefault() will return the value of an environment variable, or a default value if the variable is undefined.
 */
function envOrDefault(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
}

/**
 * displayInputParameters() will print the global scope parameters used by the main driver routine.
 */
function displayInputParameters(): void {
    console.log(`channelName:       ${channelName}`);
    console.log(`chaincodeName:     ${chaincodeName}`);
    console.log(`mspId:             ${mspId}`);
    console.log(`cryptoPath:        ${cryptoPath}`);
    console.log(`keyDirectoryPath:  ${keyDirectoryPath}`);
    console.log(`certDirectoryPath: ${certDirectoryPath}`);
    console.log(`tlsCertPath:       ${tlsCertPath}`);
    console.log(`peerEndpoint:      ${peerEndpoint}`);
    console.log(`peerHostAlias:     ${peerHostAlias}`);
}