FROM node:22.11.0-alpine3.20

WORKDIR /app/frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build && npm install serve -g 

EXPOSE 3000

CMD [ "serve", "-s", "dist"]