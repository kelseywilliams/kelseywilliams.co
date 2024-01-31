# FROM ubuntu

# # Install mysql client for mysqldump
# RUN apt-get update && apt-get install -y mysql-client

# # installing cron
# RUN apt install cron

# # Copying files into the container
# COPY . .

# # Giving executable permission to the script file
# RUN chmod +x script.sh

# # Push the cronjob into the cron container
# RUN echo "* * * * * root bash /script.sh" >> /etc/cron.d/cronj

# # Giving permission to crontab file
# RUN chmod 0644 /etc/cron.d/cronj

# RUN service cron start > /log

# # Running crontab
# #RUN crontab /etc/cron.d/cronj

# VOLUME ./backup/cron

FROM ubuntu

# Install mysql client and cron
RUN apt-get update && \
    apt-get install -y mysql-client cron && \
    rm -rf /var/lib/apt/lists/*

# Copy files
COPY . .

# Give executable permission to the script
RUN chmod +x script.sh

# Setup cron job
RUN echo "* * * * * root bash /script.sh\n" > /etc/cron.d/cronj && \
    chmod 0644 /etc/cron.d/cronj

# Define a volume
VOLUME ["/backup/cron"]

# Add an entrypoint script that starts cron and keeps the container running
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]