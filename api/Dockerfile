FROM node:16.13.0

WORKDIR /app/api

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

ENV PORT=8083

EXPOSE 8083

CMD ["yarn", "build"]