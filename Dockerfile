FROM ubuntu:20.04
RUN apt update && apt install -y nodejs && apt install -y npm
RUN npm install express
COPY dist ./dist
COPY serverApp.js ./
EXPOSE 3000
CMD PORT=$PORT node serverApp.js