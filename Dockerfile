FROM node:15-alpine3.13

RUN apk add bash

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app