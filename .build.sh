#!/bin/bash

echo -e "\n\033[32m1. Creating app folder\033[0m"
rm -rf ./app
mkdir ./app
mkdir ./app/www
mkdir ./app/www/public

echo -e "\n\033[32m2. Building frontend\033[0m"
cd ./frontend 
npm i --produdction
npm run build --produdction
mv ./dist ../app/www/public/
if [ $? -eq 0 ]
then
  echo -e "\n\033[34mFrontend successfully built.\033[0m"
else
  exit 1
fi

echo -e "\n\033[32m3. Building backend\033[0m"
cd ../backend/
if [ $? -eq 0 ]
then
  echo -e "\n\033[34mBackend successfully built.\033[0m"
else
  exit 1
fi

cp -r ./ ../app/www/
cp ../.env ../app/www/src/
rm -rf ../app/www/src/node_modules

echo -e "\n\033[32m2. Sending to server\033[0m"
cd ..

scp -P 62222 -r ./app martin@www.m-michotte.be:/home/martin/inextracker
scp -P 62222 ./docker/docker-compose.yml martin@www.m-michotte.be:/home/martin/inextracker

ssh -p 62222 martin@www.m-michotte.be "cd /home/martin/inextracker && docker-compose down && docker-compose up -d"

echo -e "\n\033[42m Done! \033[0m\n"

rm -rf ./app