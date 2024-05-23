#!/bin/bash
echo "Arrêt et suppression des conteneurs, des images et des volumes..."
docker compose -f ./docker-compose.yml down
docker rm txtai-elasticsearch-elasticsearch-1
docker rm txtai-elasticsearch-kibana-1
docker rm txtai-elasticsearch-txtai-1
docker volume rm txtai-elasticsearch_elasticsearch_data