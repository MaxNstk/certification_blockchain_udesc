#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

# import utils

NETWORK_HOME=${NETWORK_HOME:-${PWD}}

echo "NETWORK_HOME= ${NETWORK_HOME}"

echo "import script from ${NETWORK_HOME}/scripts/configUpdate.sh"
. ${NETWORK_HOME}/scripts/configUpdate.sh

echo "import script from ${NETWORK_HOME}/scripts/org_definitions.sh"
. ${NETWORK_HOME}/scripts/org_definitions.sh


# NOTE: This requires jq and configtxlator for execution.
createAnchorPeerUpdate() {
  infoln "Fetching channel config for channel $CHANNEL_NAME"
  fetchChannelConfig $ORG $CHANNEL_NAME ${NETWORK_HOME}/channel-artifacts/${CORE_PEER_LOCALMSPID}config.json

  infoln "Generating anchor peer update transaction for Org${ORG} on channel $CHANNEL_NAME"

  if [ $ORG -eq 1 ]; then
    HOST="peerCEAVI.udesc.local.com"
    PORT=${UDESC_ANCHOR_PEER_PORT}
  elif [ $ORG -eq 2 ]; then
    HOST="peer0.public.local.com"
    PORT=${PUBLIC_ANCHOR_PEER_PORT}
  else
    errorln "Org${ORG} unknown"
  fi

  infoln "Using host ${HOST} and port ${PORT}"

  set -x
  # Modify the configuration to append the anchor peer 
  jq '.channel_group.groups.Application.groups.'${CORE_PEER_LOCALMSPID}'.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "'$HOST'","port": '$PORT'}]},"version": "0"}}' ${NETWORK_HOME}/channel-artifacts/${CORE_PEER_LOCALMSPID}config.json > ${NETWORK_HOME}/channel-artifacts/${CORE_PEER_LOCALMSPID}modified_config.json
  res=$?
  { set +x; } 2>/dev/null
  verifyResult $res "Channel configuration update for anchor peer failed, make sure you have jq installed"
  

  # Compute a config update, based on the differences between 
  # {orgmsp}config.json and {orgmsp}modified_config.json, write
  # it as a transaction to {orgmsp}anchors.tx
  createConfigUpdate ${CHANNEL_NAME} ${NETWORK_HOME}/channel-artifacts/${CORE_PEER_LOCALMSPID}config.json ${NETWORK_HOME}/channel-artifacts/${CORE_PEER_LOCALMSPID}modified_config.json ${NETWORK_HOME}/channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx
}

updateAnchorPeer() {
  peer channel update -o localhost:${ORDERER_SERVICE_PORT} --ordererTLSHostnameOverride orderer.example.com -c $CHANNEL_NAME -f ${NETWORK_HOME}/channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx --tls --cafile "$ORDERER_CA" >&log.txt
  res=$?
  cat log.txt
  verifyResult $res "Anchor peer update failed"
  successln "Anchor peer set for org '$CORE_PEER_LOCALMSPID' on channel '$CHANNEL_NAME'"
}

ORG=$1
CHANNEL_NAME=$2

setGlobals $ORG

createAnchorPeerUpdate 

updateAnchorPeer 
