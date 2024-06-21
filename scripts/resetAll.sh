#!/bin/bash
echo "Arrêt et suppression des conteneurs, des images et des volumes..."
docker compose -f ../docker-compose.yml down --rmi all --volumes
echo "Environnement réinitialisé."


