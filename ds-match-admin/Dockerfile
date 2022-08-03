FROM node:16.14.0-stretch as builder

#Set Container Time Zone
#RUN apk add --no-cache tzdata
#ENV TZ America/Chicago
#RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR '/app'
COPY ./package.json ./
RUN npm install -g @angular/cli@13.1.1 && \
    npm install
COPY . .
RUN npm run build

FROM nginx:1.17.3-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
#Copy the built application to the location nginx will host the site from
COPY --from=builder /app/dist/* /usr/share/nginx/html/
