import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Network, Identity, Signer, signers, Gateway } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';

class BlockchainConnection {
  private static instance: BlockchainConnection;
  private network: Network;
  private contract: Contract;
  private gateway: Gateway;
  private grpcClient: grpc.Client;

  private channelName: string;
  private chaincodeName: string;
  private cryptoPath: string;
  private certDirectoryPath: string;
  private keyDirectoryPath: string;
  private tlsCertPath: string;
  private peerEndpoint: string;
  private peerHostAlias: string;

  private utf8Decoder = new TextDecoder();

  private constructor() {
    // Inicialização privada não pode ser assíncrona, então inicialize variáveis aqui
  }

  public static async getInstance(): Promise<BlockchainConnection> {
    if (!BlockchainConnection.instance) {
      BlockchainConnection.instance = new BlockchainConnection();
      await BlockchainConnection.instance.initialize();
    }
    return BlockchainConnection.instance;
  }

  private async initialize(): Promise<void> {
    this.initializeVariables();
    this.displayInputParameters();

    this.grpcClient = await this.newGrpcConnection();

    this.gateway = connect({
      client: this.grpcClient,
      identity: await this.newIdentity(),
      signer: await this.newSigner(),
      evaluateOptions: () => ({ deadline: Date.now() + 5000 }),
      endorseOptions: () => ({ deadline: Date.now() + 15000 }),
      submitOptions: () => ({ deadline: Date.now() + 5000 }),
      commitStatusOptions: () => ({ deadline: Date.now() + 60000 }),
    });

    this.network = this.gateway.getNetwork(this.channelName);
    this.contract = this.network.getContract(this.chaincodeName);
  }

  public disconnect(): void {
    this.gateway.close();
    this.grpcClient.close();
  }

  public getNetwork(): Network {
    return this.network;
  }

  public getContract(): Contract {
    return this.contract;
  }

  private async newGrpcConnection(): Promise<grpc.Client> {
    const tlsRootCert = await fs.readFile(this.tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(this.peerEndpoint, tlsCredentials, {
      'grpc.ssl_target_name_override': this.peerHostAlias,
    });
  }

  private async newIdentity(): Promise<Identity> {
    const mspId = this.envOrDefault('MSP_ID', 'UdescMSP'); 
    const certPath = await this.getFirstDirFileName(this.certDirectoryPath);
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
  }

  private async getFirstDirFileName(dirPath: string): Promise<string> {
    const files = await fs.readdir(dirPath);
    const file = files[0];
    if (!file) {
      throw new Error(`No files in directory: ${dirPath}`);
    }
    return path.join(dirPath, file);
  }

  private async newSigner(): Promise<Signer> {
    const keyPath = await this.getFirstDirFileName(this.keyDirectoryPath);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
  }

  private envOrDefault(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
  }

  private initializeVariables(): void {
    this.cryptoPath = this.envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '..', '..', 'blockchain', 'network', 'organizations', 'peerOrganizations', 'udesc.local.com'));
    this.certDirectoryPath = this.envOrDefault('CERT_DIRECTORY_PATH', path.resolve(this.cryptoPath, 'users', 'userCEAVI@udesc.local.com', 'msp', 'signcerts'));
    this.tlsCertPath = this.envOrDefault('TLS_CERT_PATH', path.resolve(this.cryptoPath, 'peers', 'peerCEAVI.udesc.local.com', 'tls', 'ca.crt'));
    this.keyDirectoryPath = this.envOrDefault('KEY_DIRECTORY_PATH', path.resolve(this.cryptoPath, 'users', 'userCEAVI@udesc.local.com', 'msp', 'keystore'));
    this.peerEndpoint = this.envOrDefault('PEER_ENDPOINT', 'localhost:7051');
    this.peerHostAlias = this.envOrDefault('PEER_HOST_ALIAS', 'peerCEAVI.udesc.local.com');
    this.channelName = this.envOrDefault('CHANNEL_NAME', 'certificationchannel');
    this.chaincodeName = this.envOrDefault('CHAINCODE_NAME', 'certificatesCC');
  }

  private displayInputParameters(): void {
    console.log(`channelName:       ${this.channelName}`);
    console.log(`chaincodeName:     ${this.chaincodeName}`);
    console.log(`cryptoPath:        ${this.cryptoPath}`);
    console.log(`certDirectoryPath: ${this.certDirectoryPath}`);
    console.log(`keyDirectoryPath:  ${this.keyDirectoryPath}`);
    console.log(`tlsCertPath:       ${this.tlsCertPath}`);
    console.log(`peerEndpoint:      ${this.peerEndpoint}`);
    console.log(`peerHostAlias:     ${this.peerHostAlias}`);
  }

  public async evaluateTransaction(transaction:string, ...args: Array<string | Uint8Array>): Promise<any> {
    try{
      console.log(`\n--> Evaluate Transaction: ${transaction}, with args: ${args}`);
      const resultBytes = await this.getContract().evaluateTransaction(transaction,...args);
      const resultJson = this.utf8Decoder.decode(resultBytes);
      const result: unknown = JSON.parse(resultJson);
      console.log('*** Result:', result);
      return result;
    }catch(e){
      console.log(`Erro: ${e}`)
    }
  }
}

export default BlockchainConnection;
