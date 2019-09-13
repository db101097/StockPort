FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

EXPOSE 3000

CMD [ "npm", "install","npm","start" ]