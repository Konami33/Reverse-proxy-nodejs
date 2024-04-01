# Use the official Node.js image as a base
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY index.js .

# Expose the port the app runs on
EXPOSE 9000

# Command to run the server
CMD ["node", "index.js"]
