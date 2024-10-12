# Use an official Node.js runtime as a parent image
FROM node:20.13.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for both root and client folder
COPY package*.json ./
COPY client/package*.json ./client/

# Set permissions for all files
RUN chmod -R 755 /app

# Install dependencies for both root and client
RUN npm install
RUN npm install --prefix client

# Copy the rest of your application code
COPY . .

# Set permissions for the copied files
RUN chmod -R 755 /app

# Build the frontend
RUN npm run build --prefix client

# Expose the port your app runs on
EXPOSE 8080

# Command to run your app
CMD ["npm", "run", "server"]
