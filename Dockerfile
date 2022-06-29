FROM node:14.17.0-alpine3.12 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run-script build-prod

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/
RUN ls -la /usr/share/nginx/html/