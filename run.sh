#!/bin/bash
# Launcher for bourne again shell
#     * purges all containers and
#       images and restarts
docker stop $(docker ps -a -q)
docker container prune -f
docker image prune -af
docker-compose -f traefik.yml -f docker-compose.yml up