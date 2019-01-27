FROM node:7
EXPOSE 3000

WORKDIR /usr/app

COPY package.json .
COPY ./src .

RUN npm install
CMD [ "npm", "run", "start-docker"]
