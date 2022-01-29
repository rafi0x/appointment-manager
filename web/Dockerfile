FROM node:16.13.0-alpine

WORKDIR /web

#RUN yarn global add http-server

COPY package.json ./
COPY yarn.lock ./

RUN yarn
#RUN yarnn build

COPY . .

EXPOSE 8080

#CMD ["http-server","dist"]
CMD ["yarn","serve"]