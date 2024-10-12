# Use an official Node.js runtime as a parent image
FROM node:20.13.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies for both frontend and backend
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the frontend
RUN npm run build --prefix client

# Expose the port your app runs on
EXPOSE 8080

# Command to run your app
CMD ["sh", "-c", "npm run server & npm run client"]
