#!/bin/bash
docker-compose down
docker container prune -f
docker image prune -af
docker-compose up