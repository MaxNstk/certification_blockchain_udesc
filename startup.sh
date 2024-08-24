./blockchain/network/network.sh down
./blockchain/network/network.sh up createChannel -c certificationchannel -ca
./blockchain/network/network.sh deployCC -ccn certificatesCC -ccp ../chaincode/ -ccl typescript

docker-compose -f ./application_gateway/docker-compose.yml up --build -d

#cd ./application-gateway 
#npm install 
#npm start 
#cd ../