#!/bin/bash

function createUdesc() {

  infoln "Enrolling the CA admin"
  
  mkdir -p organizations/peerOrganizations/udesc.local.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/udesc.local.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-udesc --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-udesc.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-udesc.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-udesc.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-udesc.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/udesc.local.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy udesc's CA cert to udesc's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/udesc.local.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem" "${PWD}/organizations/peerOrganizations/udesc.local.com/msp/tlscacerts/ca.crt"

  # Copy udesc's CA cert to udesc's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/udesc.local.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem" "${PWD}/organizations/peerOrganizations/udesc.local.com/tlsca/tlsca.udesc.local.com-cert.pem"

  # Copy udesc's CA cert to udesc's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/udesc.local.com/ca"
  cp "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem" "${PWD}/organizations/peerOrganizations/udesc.local.com/ca/ca.udesc.local.com-cert.pem"


  infoln "Registering the org admin"
  fabric-ca-client register --caname ca-udesc --id.name udescadmin --id.secret udescadminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"

  infoln "Generating the org admin msp"
  fabric-ca-client enroll -u https://udescadmin:udescadminpw@localhost:7054 --caname ca-udesc -M "${PWD}/organizations/peerOrganizations/udesc.local.com/users/Admin@udesc.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"

  cp "${PWD}/organizations/peerOrganizations/udesc.local.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/udesc.local.com/users/Admin@udesc.local.com/msp/config.yaml"

  #PEERS=("CEAVI") #PEERS=("CEAVI" "CCT" "CEPLAN" "CESMO")
  #for PEER in "${PEERS[@]}"; do
  PEER=CEAVI
  PEER_NAME=peer${PEER}
  PEER_PASSWORD=peer${PEER}pw

  USER_NAME=user${PEER}
  USER_PASSWORD=user${PEER}pw

  infoln "Registering peer$PEER"
  fabric-ca-client register --caname ca-udesc --id.name ${PEER_NAME} --id.secret ${PEER_PASSWORD} --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"

  infoln "Registering client user for peer$PEER"
  fabric-ca-client register --caname ca-udesc --id.name ${USER_NAME} --id.secret ${USER_PASSWORD} --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"

  infoln "Generating the $PEER_NAME msp and enrolling $USER_NAME"
  set -x
  fabric-ca-client enroll -u https://${PEER_NAME}:${PEER_PASSWORD}@localhost:7054 --caname ca-udesc -M "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"

  cp "${PWD}/organizations/peerOrganizations/udesc.local.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/msp/config.yaml"

  infoln "Generating the ${PEER_NAME}-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  fabric-ca-client enroll -u https://${PEER_NAME}:${PEER_PASSWORD}@localhost:7054 --caname ca-udesc -M "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/tls" --enrollment.profile tls --csr.hosts ${PEER_NAME}.udesc.local.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"

  cp "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/${PEER_NAME}.udesc.local.com/tls/server.key"

  infoln "Generating the user msp"
  fabric-ca-client enroll -u https://${USER_NAME}:${USER_PASSWORD}@localhost:7054 --caname ca-udesc -M "${PWD}/organizations/peerOrganizations/udesc.local.com/users/${USER_NAME}@udesc.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"
        
#  done


  #infoln "Registering peer0"
  #set -x
  #fabric-ca-client register --caname ca-udesc --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"
  #{ set +x; } 2>/dev/null

  #infoln "Registering client"
  #set -x
  #fabric-ca-client register --caname ca-udesc --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"
  #{ set +x; } 2>/dev/null

  #infoln "Generating the peer0 msp"
  #set -x
  #fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-udesc -M "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"
  #{ set +x; } 2>/dev/null

  #cp "${PWD}/organizations/peerOrganizations/udesc.local.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/msp/config.yaml"

  #infoln "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  #set -x
  #fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-udesc -M "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/tls" --enrollment.profile tls --csr.hosts peer0.udesc.local.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"
  #{ set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  #cp "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/tls/ca.crt"
  #cp "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/tls/server.crt"
  #cp "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/udesc.local.com/peers/peer0.udesc.local.com/tls/server.key"

  #infoln "Generating the user msp"
  #set -x
  #fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-udesc -M "${PWD}/organizations/peerOrganizations/udesc.local.com/users/User1@udesc.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"
  #{ set +x; } 2>/dev/null
#
  #cp "${PWD}/organizations/peerOrganizations/udesc.local.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/udesc.local.com/users/User1@udesc.local.com/msp/config.yaml"
#
  #infoln "Generating the org admin msp"
  #set -x
  #fabric-ca-client enroll -u https://udescadmin:udescadminpw@localhost:7054 --caname ca-udesc -M "${PWD}/organizations/peerOrganizations/udesc.local.com/users/Admin@udesc.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/udesc/ca-cert.pem"
  #{ set +x; } 2>/dev/null
#
  #cp "${PWD}/organizations/peerOrganizations/udesc.local.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/udesc.local.com/users/Admin@udesc.local.com/msp/config.yaml"
}

function createPublic() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/public.local.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/public.local.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:8054 --caname ca-public --tls.certfiles "${PWD}/organizations/fabric-ca/public/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-public.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-public.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-public.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-public.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/public.local.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy public's CA cert to public's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/public.local.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/public/ca-cert.pem" "${PWD}/organizations/peerOrganizations/public.local.com/msp/tlscacerts/ca.crt"

  # Copy public's CA cert to public's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/public.local.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/public/ca-cert.pem" "${PWD}/organizations/peerOrganizations/public.local.com/tlsca/tlsca.public.local.com-cert.pem"

  # Copy public's CA cert to public's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/public.local.com/ca"
  cp "${PWD}/organizations/fabric-ca/public/ca-cert.pem" "${PWD}/organizations/peerOrganizations/public.local.com/ca/ca.public.local.com-cert.pem"

  infoln "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-public --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/public/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering user"
  set -x
  fabric-ca-client register --caname ca-public --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/public/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-public --id.name publicadmin --id.secret publicadminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/public/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-public -M "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/public/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/public.local.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/msp/config.yaml"

  infoln "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-public -M "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/tls" --enrollment.profile tls --csr.hosts peer0.public.local.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/public/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/public.local.com/peers/peer0.public.local.com/tls/server.key"

  infoln "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:8054 --caname ca-public -M "${PWD}/organizations/peerOrganizations/public.local.com/users/User1@public.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/public/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/public.local.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/public.local.com/users/User1@public.local.com/msp/config.yaml"

  infoln "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://publicadmin:publicadminpw@localhost:8054 --caname ca-public -M "${PWD}/organizations/peerOrganizations/public.local.com/users/Admin@public.local.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/public/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/public.local.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/public.local.com/users/Admin@public.local.com/msp/config.yaml"
}

function createOrderer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/example.com

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/example.com

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orderer org's CA cert to orderer org's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/example.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

  # Copy orderer org's CA cert to orderer org's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/ordererOrganizations/example.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/example.com/tlsca/tlsca.example.com-cert.pem"

  infoln "Registering orderer"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Registering the orderer admin"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  infoln "Generating the orderer msp"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/config.yaml"

  infoln "Generating the orderer-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls" --enrollment.profile tls --csr.hosts orderer.example.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the orderer's tls directory that are referenced by orderer startup config
  cp "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/ca.crt"
  cp "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/signcerts/"* "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/server.crt"
  cp "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/keystore/"* "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/server.key"

  # Copy orderer org's CA cert to orderer's /msp/tlscacerts directory (for use in the orderer MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

  infoln "Generating the admin msp"
  set -x
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/example.com/users/Admin@example.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/example.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/example.com/users/Admin@example.com/msp/config.yaml"
}
