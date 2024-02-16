#!/bin/bash/
hpath="/etc/ssl/certs/"
vpath="/var/lib/docker/volumes/kelseywilliams_certs/_data/"
cp $hpath/kelseywilliams.co.key $vpath/kelseywilliams.co.key
cp $hpath/kelseywilliams.co.crt $vpath/kelseywilliams.co.crt
cp $hpath/kelseywilliams.co.ca $vpath/kelseywilliams.co.ca
