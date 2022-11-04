# Using node:16-alpine base image
FROM node:16-alpine 

# Set /app as the default work directory
WORKDIR /app

# copy package.json to the working directory for packages installation
COPY package.json /app

# Install npm dependencies
RUN npm install

# Copy all the project files to the working directory
COPY . .

# Expose the port of your application to bind with the host port
EXPOSE 3000
EXPOSE 3001

# run your app
CMD ["/usr/local/bin/npm", "run", "start"]