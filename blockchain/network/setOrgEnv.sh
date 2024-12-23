#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0




# default to using Udesc
ORG=${1:-Udesc}

# Exit on first error, print all commands.
set -e
set -o pipefail

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

ORDERER_CA=${DIR}/network/organizations/ordererOrganizations/example.com/tlsca/tlsca.example.com-cert.pem
PEER0_ORG1_CA=${DIR}/network/organizations/peerOrganizations/udesc.local.com/tlsca/tlsca.udesc.local.com-cert.pem
PEER0_ORG2_CA=${DIR}/network/organizations/peerOrganizations/public.local.com/tlsca/tlsca.public.local.com-cert.pem


if [[ ${ORG,,} == "udesc" || ${ORG,,} == "digibank" ]]; then

   CORE_PEER_LOCALMSPID=UdescMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/network/organizations/peerOrganizations/udesc.local.com/users/Admin@udesc.local.com/msp
   CORE_PEER_ADDRESS=localhost:7051
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/network/organizations/peerOrganizations/udesc.local.com/tlsca/tlsca.udesc.local.com-cert.pem

elif [[ ${ORG,,} == "public" || ${ORG,,} == "magnetocorp" ]]; then

   CORE_PEER_LOCALMSPID=PublicMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/network/organizations/peerOrganizations/public.local.com/users/Admin@public.local.com/msp
   CORE_PEER_ADDRESS=localhost:9051
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/network/organizations/peerOrganizations/public.local.com/tlsca/tlsca.public.local.com-cert.pem
fi

# output the variables that need to be set
echo "CORE_PEER_TLS_ENABLED=true"
echo "ORDERER_CA=${ORDERER_CA}"
echo "PEER0_ORG1_CA=${PEER0_ORG1_CA}"
echo "PEER0_ORG2_CA=${PEER0_ORG2_CA}"

echo "CORE_PEER_MSPCONFIGPATH=${CORE_PEER_MSPCONFIGPATH}"
echo "CORE_PEER_ADDRESS=${CORE_PEER_ADDRESS}"
echo "CORE_PEER_TLS_ROOTCERT_FILE=${CORE_PEER_TLS_ROOTCERT_FILE}"

echo "CORE_PEER_LOCALMSPID=${CORE_PEER_LOCALMSPID}"
