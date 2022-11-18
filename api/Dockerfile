FROM node:18.12.1 AS base

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

FROM base as prod
RUN npm install --production
COPY . /app/
CMD ["node", "server.js"]

FROM base AS dev
RUN npm install
COPY . /app/
CMD ["npm", "start"]
