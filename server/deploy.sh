#!/bin/bash

echo What should the version be?
read VERSION

sudo docker build -t oddgrd/myhomeboard:$VERSION .
sudo docker push oddgrd/myhomeboard:$VERSION
ssh root@164.90.209.133 "docker pull oddgrd/myhomeboard:$VERSION && docker tag oddgrd/myhomeboard:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
