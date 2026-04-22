FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY server/package*.json ./server/
RUN cd server && npm install


COPY . .

EXPOSE 5173
EXPOSE 3100

RUN npm install -g concurrently

CMD ["concurrently", "npm run dev", "node server/index.js"]