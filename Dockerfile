# Use an official Node.js runtime as a parent image
FROM node:20.13.0

# Set the working directory in the container
WORKDIR /app

# Copy both the client and server package.json files
COPY ./package*.json ./client/package*.json /app/client/

# Install dependencies
RUN npm install --prefix client

# Copy the rest of the client application code
COPY ./client /app/client

# Build the frontend
RUN npm run build --prefix client

# Expose the port your app runs on
EXPOSE 8080

# Command to run your app
CMD ["npm", "run", "server"]
