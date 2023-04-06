# Use an official Node.js runtime as a parent image
FROM node:18 as builder

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

#======================

# Use nginx as static web server
FROM nginx:alpine

# Copy the built application files to the Nginx web server directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
