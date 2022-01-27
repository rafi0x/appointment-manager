FROM node:16.13.0-alpine

WORKDIR /web

RUN yarn global add http-server

COPY package.json ./
COPY yarn.lock ./

RUN rm -rf node_modules && yarn
RUN yarn build

RUN cd dist/ && mv entry.html index.html

COPY . .

EXPOSE 8080

CMD ['http-server','dist']