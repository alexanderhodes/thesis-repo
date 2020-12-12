# stop docker containers
sudo docker container stop bigchaindb
sudo docker container stop neo4j

# remove docker containers
sudo docker container rm bigchaindb
sudo docker container rm neo4j

# start bigchain db with docker
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
