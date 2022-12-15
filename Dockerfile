FROM node:16-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install -g json-server

COPY /build /app/public
COPY ./db_example.json /app/

RUN mv /app/db_example.json /app/db.json

EXPOSE 3000

CMD ["/usr/local/bin/npx", "json-server", "--watch", "/app/db.json", "--host", "0.0.0.0"]