FROM node:20
WORKDIR /usr/src/app
COPY package.json ./
RUN npm cache verify
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
