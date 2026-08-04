FROM node:24
WORKDIR /usr/src/app
COPY package*.json ./
# No .env is baked in: this image is published to a public Docker Hub repo.
# DATABASE_URL / CLERK_* are injected at `docker run` time by the deploy job.
# `prisma generate` below does not need them.
RUN npm cache verify
RUN npm install --only=production
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]
