FROM node:slim

WORKDIR /app

COPY . .
RUN npm i --omit=dev

CMD node --enable-source-maps ./dist/index.js
