FROM node:16

EXPOSE 9090

COPY package*.json ./

COPY . .

RUN mv .env.production .env

RUN npm cache clear --force
RUN npm install
RUN npm install -g pm2 --legacy-peer-deps
RUN npx prisma generate

RUN npm run build
CMD [ "pm2", "start", "dist/main.js", "--no-daemon" ]
