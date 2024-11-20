# Build stage
FROM oven/bun:1.0 as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lockb ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && bun run build

# Build backend (if you have a build step)
RUN cd backend && bun run build

# Production stage
FROM oven/bun:1.0

WORKDIR /app

# Copy only the necessary built files
COPY --from=builder /app/frontend/dist /app/frontend/dist
COPY --from=builder /app/backend/package.json /app/backend/
COPY --from=builder /app/backend/dist /app/backend/dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./

# Install only production dependencies
RUN bun install --production

# Expose ports
EXPOSE 3000 8080

# Create start script for production
RUN echo '#!/bin/sh\n\
trap "kill 0" EXIT\n\
cd frontend && bunx vite preview --port 3000 --host & \
cd backend && PORT=8080 node dist/index.js' > /app/start.sh

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]