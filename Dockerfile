# Use an official Node.js runtime as a parent image
FROM node:20.13.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the frontend
RUN npm run build --prefix client

# Expose the port the app runs on
EXPOSE 8080

# Start the backend server
CMD ["npm", "start"]
