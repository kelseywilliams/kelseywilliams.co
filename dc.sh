#!/bin/bash
# docker-compose substitute for Unix environments
# purges all containers and images and restarts
# just call (bash) ./dc 
docker stop $(docker ps -a -q)
docker container prune -f
docker image prune -af
docker-compose -f docker-compose.yml up