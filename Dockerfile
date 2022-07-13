FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN npm install -g serve
RUN npm run build

EXPOSE 3005
CMD [ "npm", "start" ]
