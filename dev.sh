#!/bin/bash
# docker-compose substitute for Unix environments
# purges all containers and images and restarts
# just call (bash) ./dc 

docker-compose down
docker container prune -f
docker image prune -af
docker-compose -f docker-compose.yml up