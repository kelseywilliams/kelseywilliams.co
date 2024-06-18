echo off
:: Launcher for docker compose dev 
:: environment on Windows OS.
::     * purges all containers and
::       images and restarts
::     * Sets docker host to a remote
:: just type runl!

@REM docker-compose down
@REM docker container prune -f
@REM docker image prune -af
:: set DOCKER_HOST=ssh://kelsey@localhost
docker-compose -f docker-compose.yml up --build