# Use the official Node.js image as the base image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file
# COPY config.env ./config.env

# Expose the port the app runs on
EXPOSE 8800

# Command to run the app
CMD ["npm", "start"]
