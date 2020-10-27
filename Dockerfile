FROM node:13-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm update
RUN npm run build
CMD [ "npm", "start" ]
EXPOSE 3000
