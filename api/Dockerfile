FROM node:18.12.1 AS base

WORKDIR /app

FROM base as prod
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . /app/
CMD ["npm", "start"]

FROM base AS dev
EXPOSE 3000
CMD ["npm", "dev"]
