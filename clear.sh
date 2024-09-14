./blockchain/network/network.sh down
docker kill $(docker ps -q)
docker compose down --remove-orphans ; docker rm $(docker ps -aq) ; docker rmi $(docker images -q); docker system prune
docker volume rm $(docker volume ls -q)