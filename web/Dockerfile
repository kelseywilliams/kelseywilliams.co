# Create image from php and apache image
FROM php:8-apache

# Setup SSL (https, coming soon)
#RUN a2enmod ssl && a2enmod rewrite
#RUN mkdir -p /etc/apache2/ssl

# Set the working directory to /var/www/html/ in container
WORKDIR /etc/apache2/

# Changes php initialization from development to production (i think)
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

# Copy the site default config files into sites available on container
COPY ./.apache2/sites-available/* /etc/apache2/sites-available/

COPY ./.apache2/ports.conf /etc/apache2/ports.conf

# Install certificates folder
COPY ./certs/* ./certs/

# Install website
COPY ./site/. /var/www/html/.

# Install mysqli for database connections via php
RUN docker-php-ext-install mysqli

# Enable kelseywilliams.co configuration
RUN a2ensite kelseywilliams.co

# Enable apache rewrite mod
RUN a2enmod rewrite

# Enable SSL
RUN a2enmod ssl

# link site configuration file and sites enabled
#RUN ln -s /etc/apache2/sites-available/kelseywilliams.co.conf /etc/apache2/sites-enabled/kelseywilliams.co.conf

RUN service apache2 restart

# Expose http and https ports
# http
EXPOSE 80
# https
EXPOSE 443
