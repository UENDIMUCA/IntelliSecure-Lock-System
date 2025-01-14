# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY api/ ./api

# Install the dependencies
RUN npm install

EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]