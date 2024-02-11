FROM ubuntu

WORKDIR /

RUN mkdir dump

# Copy files
COPY . .

# Give executable permission to the script
RUN chmod u+x backup.sh && chmod u+x restore.sh

# Install mysql client and cron
RUN apt-get update && apt-get install -y mysql-client cron 

# Setup cron job to run every hour
RUN echo "0 * * * * root bash /backup.sh\n" > /etc/cron.d/cronj && chmod 0644 /etc/cron.d/cronj

# Add an entrypoint script that starts cron and keeps the container running
COPY entrypoint.sh /entrypoint.sh

# Assign executive permissions to entrypoint script
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]