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

# When the container starts, replace the environment variables form settings-template.json to environment-settings.json
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/settings/settings-template.json > /usr/share/nginx/html/assets/settings/environment-settings.json && exec nginx -g 'daemon off;'"]

