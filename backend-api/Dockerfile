FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

# CMD ["ls", "-la"]
CMD ["node", "server.js"]
