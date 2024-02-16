echo off
:: docker-compose substitute for Windows
:: purges all containers and images and restarts
:: just type dc

docker-compose down
docker container prune -f
docker image prune -af
:: set DOCKER_HOST=ssh://root@kelseywilliams.co
docker-compose -f docker-compose.yml up