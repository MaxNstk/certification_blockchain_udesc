
./test-network/network.sh down
./test-network/network.sh up createChannel -c mychannel -ca
./test-network/network.sh deployCC -ccn basic -ccp ../chaincode-typescript/ -ccl typescript

cd ./application-gateway-typescript 
npm install 
npm start 