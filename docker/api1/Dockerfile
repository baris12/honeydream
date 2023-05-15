FROM node:alpine3.16

COPY "Node-API-For-Honeypot1/" "/app"
WORKDIR /app
RUN rm -r node_modules
RUN npm install

ENTRYPOINT npm start