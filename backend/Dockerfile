FROM node:22.11.0-alpine3.20

WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate && npx prisma migrate dev

RUN npx prisma db seed && npm run build

EXPOSE 80


CMD ["npm", "run", "start:prod"]
