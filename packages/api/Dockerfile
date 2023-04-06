# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any dependencies specified in package.json
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application is running on
EXPOSE 8080

# Run the command to start the application
CMD ["npm", "run", "start:prod"]
