# certification_blockchain_udesc

cd network

./network.sh down
./network.sh up createChannel -c certificationchannel -ca
./network.sh deployCC -ccn certificatesCC -ccp ../chaincode-typescript/ -ccl typescript

cd ../application-gateway-typescript
npm install
npm start
