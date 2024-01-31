# Create image from php and apache image
FROM php:8-apache

# Setup SSL (https, coming soon)
#RUN a2enmod ssl && a2enmod rewrite
#RUN mkdir -p /etc/apache2/ssl

# Set the working directory to /var/www/html/ in container
WORKDIR /var/www/html

# Changes php initialization from development to production (i think)
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

# Copy the site default config files into sites available on container
COPY ./apache/000-default.conf /etc/apache2/sites-available/000-default.conf

COPY . .

# Install mysqli for database connections via php
RUN docker-php-ext-install mysqli && a2enmod rewrite

# Expose http and https ports
# http
EXPOSE 80
# https
EXPOSE 443