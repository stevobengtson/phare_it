FROM node:lts-alpine

WORKDIR /app
EXPOSE 4200
COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]