FROM node:16-alpine

WORKDIR /app

RUN npm install -g json-server

COPY ./scripts/start.sh /app/start.sh
COPY ./build /app/public
COPY ./db_example.json /app/

EXPOSE 3000

ENTRYPOINT ["sh", "/app/start.sh"]