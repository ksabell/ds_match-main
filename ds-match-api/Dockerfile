# Use an official node image as parent image
FROM node:16.14-alpine

#Set Container Time Zone
RUN apk add --no-cache tzdata
ENV TZ America/Chicago
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./package*.json ./

# Install any needed packages specified in package.json
RUN npm install && npm install pm2 -g

#Copy the rest of the application
COPY . .
CMD pm2-runtime start pm2.json --env ${ENV}
EXPOSE 2338
