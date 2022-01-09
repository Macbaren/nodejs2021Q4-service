FROM node:16-alpine

EXPOSE 3000

WORKDIR /usr/app/src

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "dev"]
