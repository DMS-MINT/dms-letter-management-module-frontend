# Base image with Node.js
FROM node:18-alpine AS base

# Install necessary system dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Stage 1: Install dependencies
FROM base AS deps

# Copy only the lockfile and package.json for dependency installation
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Stage 2: Build application
FROM base AS builder
WORKDIR /usr/src/app

# Copy dependencies from the deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy application source code
COPY . .

# Run the build process
RUN pnpm build

# Stage 3: Production image
FROM base AS runner

WORKDIR /usr/src/app

# Add a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets and built application
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

