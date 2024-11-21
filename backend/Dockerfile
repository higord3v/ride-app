# Use official Node.js image as a base
FROM node:22.11.0-alpine3.20

# Set the working directory
WORKDIR /app/backend

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
