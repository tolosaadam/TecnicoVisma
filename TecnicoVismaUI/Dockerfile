### Build ###
FROM node:14.16.0-alpine AS build


WORKDIR /app

COPY package.json .
RUN npm install

COPY . ./
RUN npm run build


### Run ###
FROM nginx:alpine

COPY --from=build /app/dist/tecnico-visma-ui /usr/share/nginx/html/

