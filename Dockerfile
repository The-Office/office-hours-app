FROM oven/bun:latest as builder
WORKDIR /app
COPY package.json ./
COPY bun.lockb ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/
RUN bun install --frozen-lockfile
COPY . .
RUN cd apps/frontend && bun run build
RUN cd apps/backend && bun run build

FROM oven/bun:slim
WORKDIR /app
# Copy only production node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY bun.lockb ./
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

EXPOSE 4173 8080