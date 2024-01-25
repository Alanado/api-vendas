FROM node:current-slim

WORKDIR /jrica/api_vendas/

COPY package.json .

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "dev" ]

COPY . .