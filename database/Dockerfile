FROM mysql
COPY ./migrations/seed.sql /migrations/seed.sql
ENTRYPOINT ["bash", "-c", "mysql -u root -h db --port 3306 user < /migrations/seed.sql"]