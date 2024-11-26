FROM oven/bun:latest as builder

WORKDIR /app

# Copy only root package files for dependency caching
COPY package.json ./
COPY bun.lockb ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/

# Install all dependencies
RUN bun install --production

# Copy all source code and workspace files
COPY . .

# Build both applications
RUN cd apps/frontend && bun run build
RUN cd apps/backend && bun run build

# Production image
FROM oven/bun:slim

WORKDIR /app

# Copy only what's needed for production
COPY package.json ./
COPY bun.lockb ./

# Install production dependencies
RUN bun install --production

# Copy built assets
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

EXPOSE 4173 8080

CMD ["bun", "run", "start"]