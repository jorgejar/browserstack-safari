
FROM node:8-alpine

COPY ./certs/ /usr/app/certs
COPY ./dist/ /usr/app/dist
COPY ./server.js /usr/app/server.js
COPY ./package.json /usr/app/package.json

WORKDIR /usr/app
RUN yarn
#http
EXPOSE 9301
#https
EXPOSE 9302
CMD ["yarn", "serve"]

