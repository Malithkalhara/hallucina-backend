# Use the official Node.js 18 image as the base image
FROM node:18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD [ "npm", "run", "dev" ]

EXPOSE 8000
