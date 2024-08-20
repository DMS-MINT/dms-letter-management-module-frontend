# Use the Node.js 20 Alpine base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9.6.0

# Copy package.json and package-lock.json to the container
COPY ../package*.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the entire project to the container
COPY ../ .

# Expose port 3000
EXPOSE 3000

# Build and start the Next.js application
CMD ["sh", "-c", "pnpm run build && pnpm run start"]
