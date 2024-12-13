FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env .env
RUN npm cache verify
RUN npm install --only=production
RUN npx prisma generate
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
