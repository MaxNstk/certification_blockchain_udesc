#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

NETWORK_HOME=${NETWORK_HOME:-${PWD}}
infoln "NETWORK_HOME = $NETWORK_HOME"

. ${NETWORK_HOME}/scripts/utils.sh
. ${NETWORK_HOME}/scripts/org_definitions.sh

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${NETWORK_HOME}/organizations/ordererOrganizations/example.com/tlsca/tlsca.example.com-cert.pem
export PEER0_ORG1_CA=${NETWORK_HOME}/organizations/peerOrganizations/udesc.local.com/tlsca/tlsca.udesc.local.com-cert.pem
export PEER0_ORG2_CA=${NETWORK_HOME}/organizations/peerOrganizations/public.local.com/tlsca/tlsca.public.local.com-cert.pem


setUdescGlobals(){
  infoln "setting globals for udesc"
  export CORE_PEER_LOCALMSPID=UdescMSP
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
  export CORE_PEER_MSPCONFIGPATH=${NETWORK_HOME}/organizations/peerOrganizations/udesc.local.com/users/Admin@udesc.local.com/msp
}
setPublicGlobals(){
  infoln "setting globals for public"
  export CORE_PEER_LOCALMSPID=PublicMSP
  export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
  export CORE_PEER_MSPCONFIGPATH=${NETWORK_HOME}/organizations/peerOrganizations/public.local.com/users/Admin@public.local.com/msp
}

setGlobals(){
  infoln "setting globals"
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi

  if [ $USING_ORG -eq 1 ]; then
    setUdescGlobals
    export CORE_PEER_ADDRESS=localhost:${UDESC_ANCHOR_PEER_PORT}
  elif [ $USING_ORG -eq 2 ]; then
    setPublicGlobals
    export CORE_PEER_ADDRESS=localhost:${PUBLIC_ANCHOR_PEER_PORT}
  fi  
  if [ "$VERBOSE" = "true" ]; then
    env | grep CORE
  fi
}

# parsePeerConnectionParameters $@
# Helper function that sets the peer connection parameters for a chaincode
# operation
parsePeerConnectionParameters() {
  PEER_CONN_PARMS=()
  infoln "PEER_CONN_PARMS=== ${PEER_CONN_PARMS}"
  PEERS=""
  while [ "$#" -gt 0 ]; do
    setGlobals $1
    PEER="peer0.org$1"
    ## Set peer addresses
    if [ -z "$PEERS" ]
    then
	PEERS="$PEER"
    else
	PEERS="$PEERS $PEER"
    fi
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" --peerAddresses $CORE_PEER_ADDRESS)
    ## Set path to TLS certificate
    # UDESC_CA_ROOTCERT_FILE
    # PUBLIC_CA_ROOTCERT_FILE
    CA=PEER0_ORG$1_CA
    TLSINFO=(--tlsRootCertFiles "${!CA}")
    PEER_CONN_PARMS=("${PEER_CONN_PARMS[@]}" "${TLSINFO[@]}")
    infoln "PEER_CONN_PARMS=== ${PEER_CONN_PARMS}"

    # shift by one to get to the next organization
    shift
  done
}

verifyResult() {
  if [ $1 -ne 0 ]; then
    fatalln "$2"
  fi
}
