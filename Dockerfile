FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm@9.6.0

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "pnpm run build && pnpm run start"]
