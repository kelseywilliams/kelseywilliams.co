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
COPY ./.apache2/sites-available/* /etc/apache2/sites-available/

COPY . .

# Install mysqli for database connections via php
RUN docker-php-ext-install mysqli && a2enmod rewrite

# Install SSl certificates and enable SSL

COPY ./certs/* /etc/apache2/ssl/

RUN a2enmod ssl

# Enable kelseywilliams.co configuration
RUN a2ensite kelseywilliams.co

# Expose http and https ports
# http
EXPOSE 80
# https
EXPOSE 443