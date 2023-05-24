# Define the base image
FROM node:14

# Create app directory in Docker
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source inside Docker image
COPY . .

# Your app listens on port 3000 so you'll use that for Docker's EXPOSE instruction
EXPOSE 3000

CMD [ "node", "index.js" ]
