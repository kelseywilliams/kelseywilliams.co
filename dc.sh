#!/bin/bash
# docker-compose substitute for Unix environments
# purges all containers and images and restarts
# just call
docker-compose down
docker container prune -f
docker image prune -af
docker-compose up