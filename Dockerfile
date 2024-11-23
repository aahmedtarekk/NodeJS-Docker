# Step 1: Use the Alpine variant of Node.js
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy your application files to the container
COPY app.js /app

# Step 4: Expose the port that your app will run on
EXPOSE 3000

# Step 5: Command to run the application
CMD ["node", "app.js"]
