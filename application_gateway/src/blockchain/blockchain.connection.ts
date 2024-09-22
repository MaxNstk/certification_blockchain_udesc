import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Network, Identity, Signer, signers, Gateway } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { User } from 'src/users/user.schema';

class BlockchainConnection {

  private network: Network;
  private contract: Contract;
  private gateway: Gateway;
  private grpcClient: grpc.Client;

  private channelName: string;
  private chaincodeName: string;
  private mspId: string;

  private certDirectoryPath: string;
  private keyDirectoryPath: string;
  private tlsCertPath: string;
  private peerEndpoint: string;
  private peerHostAlias: string;

  private utf8Decoder = new TextDecoder();

  private constructor() {}

  public static async getConnection(user: User): Promise<BlockchainConnection>{
    let connection: BlockchainConnection = new BlockchainConnection();
    connection.initializeVariables(user);
    await connection.initialize();
    return connection;
  }

  public async initialize(): Promise<void> {
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
    const mspId = this.mspId; 
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

  private initializeVariables(user : User): void {
    if (user.campus){
      this.mspId = 'UdescMSP';
      this.certDirectoryPath = user.campus.certDirectoryPath;
      this.tlsCertPath = user.campus.tlsCertPath;
      this.keyDirectoryPath = user.campus.keyDirectoryPath;
      this.peerEndpoint = user.campus.peerEndpoint;
      this.peerHostAlias = user.campus.peerHostAlias;
      this.channelName = this.envOrDefault('CHANNEL_NAME', 'certificationchannel');
      this.chaincodeName = this.envOrDefault('CHAINCODE_NAME', 'certificatesCC');
    }else{
      this.mspId = 'PublicMSP';
      const cryptoPath = path.resolve(__dirname,'..', '..', '..', 'blockchain', 'network', 'organizations', 'peerOrganizations', 'public.local.com');    
      this.certDirectoryPath =path.resolve(cryptoPath, 'users', 'User1@public.local.com', 'msp', 'signcerts'),
      this.tlsCertPath =path.resolve(cryptoPath, 'peers', 'peer0.public.local.com', 'tls', 'ca.crt'),
      this.keyDirectoryPath =path.resolve(cryptoPath, 'users', 'User1@public.local.com', 'msp', 'keystore'),
      this.peerEndpoint ='localhost:9051',
      this.peerHostAlias ='peer0.public.local.com'
      this.channelName = this.envOrDefault('CHANNEL_NAME', 'certificationchannel');
      this.chaincodeName = this.envOrDefault('CHAINCODE_NAME', 'certificatesCC');
    }
  }

  private displayInputParameters(): void {
    console.log(`channelName:       ${this.channelName}`);
    console.log(`chaincodeName:     ${this.chaincodeName}`);
    console.log(`certDirectoryPath: ${this.certDirectoryPath}`);
    console.log(`keyDirectoryPath:  ${this.keyDirectoryPath}`);
    console.log(`tlsCertPath:       ${this.tlsCertPath}`);
    console.log(`peerEndpoint:      ${this.peerEndpoint}`);
    console.log(`peerHostAlias:     ${this.peerHostAlias}`);
  }

  public async evaluateTransaction(transaction:string, ...args: Array<string | Uint8Array>): Promise<JSON> {
    try{
      console.log(`\n Evaluationg Transaction: ${transaction}, with args: ${args}`);
      const resultBytes = await this.getContract().evaluateTransaction(transaction,...args);
      const resultJson = this.utf8Decoder.decode(resultBytes);
      const result: JSON = JSON.parse(resultJson);
      console.log('Result:', result);
      return result;
    }catch(e){
      console.log(`Error evaluating transaction: ${e}`);
      throw e;
    }
  }

  public async submitTransaction(transaction:string, ...args: Array<string | Uint8Array>): Promise<JSON> {
    try{
      console.log(`\n--> Submiting Transaction: ${transaction}, with args: ${args}`);
      const resultBytes = await this.getContract().submitTransaction(transaction,...args);
      const resultJson = this.utf8Decoder.decode(resultBytes);
      if (!resultJson){
        return;
      }
      const result: JSON = JSON.parse(resultJson);
      console.log('Result:', result);
      return result;
    }catch(e){
      console.log(`Error evaluating transaction: ${e}`);
      throw e;
    }
  }

  public async initLedger(): Promise<void> {
    console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of Certificates on the ledger');
    await this.submitTransaction('InitLedger');
  }
}

export default BlockchainConnection;
