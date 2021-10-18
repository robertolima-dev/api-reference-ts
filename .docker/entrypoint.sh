#! /bin/bash

npm i -g npm@latest
npm install
npm run db:migrate
npm run dev
