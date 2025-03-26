# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy .env file into the container
COPY .env .env

# Build the NestJS app
RUN npm run build

# Expose the port from the .env file (default to 7001)
EXPOSE ${PORT}

# Start the application
CMD ["npm", "run", "start:prod"]
