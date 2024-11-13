# Use Node.js as base image
FROM node:18-bullseye

# Install Python and required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    poppler-utils \
    tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install Node.js dependencies
RUN pnpm install

# Copy Python requirements and install Python dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy the rest of the application
COPY . .

# Build TypeScript
RUN pnpm tsc

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "dev"]
