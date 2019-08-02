#!/bin/bash

# any future command that fails will exit the script
set -e

# Delete the old repo
rm -rf backend/

# clone the repo again
echo "Cloning repo"

git clone https://gitlab.com:3b-yxvxY3J2UCu6aarz6@gitlab.com/arqueio-developers/backend.git

#source the nvm file. In an non
#If you are not using nvm, add the actual path like
# PATH=/home/ubuntu/node/bin:$PATH
source .nvm/nvm.sh

# stop the previous pm2
#pm2 kill
#npm remove pm2 -g


#pm2 needs to be installed globally as we would be deleting the repo folder.
# this needs to be done only once as a setup script.
#npm install pm2 -g
# starting pm2 daemon
#pm2 status

cd backend

#install npm packages
echo "Running npm install"
npm install

npm build

#Restart the node server
npm start
