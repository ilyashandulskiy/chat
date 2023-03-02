FROM node:16

EXPOSE 9090

COPY package*.json ./

COPY . .

RUN npm cache clear --force
RUN npm install
RUN npx prisma generate

CMD [ "npm", "start" ]