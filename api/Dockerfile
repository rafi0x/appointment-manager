FROM node:16.13.0

WORKDIR /app/api

COPY package*.json ./
#COPY yarn.lock ./

RUN npm i

COPY . .

RUN npm run build

ENV PORT=8083

EXPOSE 8083

CMD ["npm", "start"]