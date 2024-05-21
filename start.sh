#!/bin/bash
echo " Starting txtai server"
docker compose -f ./docker-compose.yml up -d --build
#docker compose logs --follow txtai
docker compose logs 