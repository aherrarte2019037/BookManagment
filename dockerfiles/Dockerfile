FROM node:16-buster AS builder
WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install
COPY ../frontend ./
RUN npm run build
FROM nginx:latest

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]