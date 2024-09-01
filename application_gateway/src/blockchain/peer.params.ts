import path from "path";

export interface PeerParams  {
    certDirectoryPath: string;
    keyDirectoryPath: string;
    tlsCertPath: string;
    peerEndpoint: string;
    peerHostAlias: string;    
}

export const cryptoPath = envOrDefault('CRYPTO_PATH', 
    path.resolve(__dirname,'..', '..', '..', 'blockchain', 'network', 'organizations', 'peerOrganizations', 'udesc.local.com')
);

export const PEER_CONNECTIONS: Record<string, PeerParams> = {
    CEAVI: {
        certDirectoryPath : path.resolve(cryptoPath, 'users', 'userCEAVI@udesc.local.com', 'msp', 'signcerts'),
        tlsCertPath : path.resolve(cryptoPath, 'peers', 'peerCEAVI.udesc.local.com', 'tls', 'ca.crt'),
        keyDirectoryPath : path.resolve(cryptoPath, 'users', 'userCEAVI@udesc.local.com', 'msp', 'keystore'),
        peerEndpoint : 'localhost:7051',
        peerHostAlias : 'peerCEAVI.udesc.local.com'
    } as PeerParams,
    CCT: {
        certDirectoryPath : path.resolve(cryptoPath, 'users', 'userCCT@udesc.local.com', 'msp', 'signcerts'),
        tlsCertPath : path.resolve(cryptoPath, 'peers', 'peerCCT.udesc.local.com', 'tls', 'ca.crt'),
        keyDirectoryPath : path.resolve(cryptoPath, 'users', 'userCCT@udesc.local.com', 'msp', 'keystore'),
        peerEndpoint : 'localhost:7055',
        peerHostAlias : 'peerCCT.udesc.local.com'
    } as PeerParams,
    CEPLAN: {
        certDirectoryPath : path.resolve(cryptoPath, 'users', 'userCEPLAN@udesc.local.com', 'msp', 'signcerts'),
        tlsCertPath : path.resolve(cryptoPath, 'peers', 'peerCEPLAN.udesc.local.com', 'tls', 'ca.crt'),
        keyDirectoryPath : path.resolve(cryptoPath, 'users', 'userCEPLAN@udesc.local.com', 'msp', 'keystore'),
        peerEndpoint : 'localhost:7057',
        peerHostAlias : 'peerCEPLAN.udesc.local.com'
    } as PeerParams,
    CESMO: {
        certDirectoryPath : path.resolve(cryptoPath, 'users', 'userCESMO@udesc.local.com', 'msp', 'signcerts'),
        tlsCertPath : path.resolve(cryptoPath, 'peers', 'peerCESMO.udesc.local.com', 'tls', 'ca.crt'),
        keyDirectoryPath : path.resolve(cryptoPath, 'users', 'userCESMO@udesc.local.com', 'msp', 'keystore'),
        peerEndpoint : 'localhost:7059',
        peerHostAlias : 'peerCESMO.udesc.local.com'
    } as PeerParams,
}






