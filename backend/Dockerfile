FROM node:22.11.0-alpine3.20

WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN npx prisma migrate dev --name init && npx prisma db seed

CMD ["npm", "run", "start:prod"]
