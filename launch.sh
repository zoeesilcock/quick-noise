#!/bin/sh
cd /app/server
npx sequelize-cli db:migrate
node .
