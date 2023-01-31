FROM node:12-alpine

WORKDIR /web

#RUN yarn global add http-server
RUN npm i --global http-server

COPY package*.json ./
#COPY yarn.lock ./

RUN npm ci
RUN npm run build

COPY . .

EXPOSE 8080

CMD ["http-server","dist"]
#CMD ["npm","run","serve"]