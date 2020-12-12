# stop docker containers
echo "stopping containers bigchaindb and neo4j"
sudo docker container stop bigchaindb
sudo docker container stop neo4j

# remove docker containers
echo "removing containers bigchaindb and neo4j"
sudo docker container rm bigchaindb
sudo docker container rm neo4j

# start bigchain db with docker
echo "starting containers bigchaindb and neo4j"
sudo docker run \
  --detach \
  --name bigchaindb \
  --net=host \
  --volume $HOME/bigchaindb_docker/mongodb/data/db:/data/db \
  --volume $HOME/bigchaindb_docker/mongodb/data/configdb:/data/configdb \
  --volume $HOME/bigchaindb_docker/tendermint:/tendermint \
  bigchaindb/bigchaindb:all-in-one
# start neo4j with docker
sudo docker run \
  --detach \
  --name neo4j \
  --net=host \
  --env NEO4J_AUTH=neo4j/j4oen \
  neo4j:latest

# list running container
sudo docker container list
