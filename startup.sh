
./network/network.sh down
./network/network.sh up createChannel -c certificationchannel -ca
./network/network.sh deployCC -ccn certificatesCC -ccp ../chaincode-typescript/ -ccl typescript

cd ./application-gateway-typescript 
npm install 
npm start 
cd ../