#!/bin/sh

git pull;

cp -rf www/* /home/dev/local/tomcat/webapps/ROOT/

pm2 restart all
