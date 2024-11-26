FROM oven/bun:slim

WORKDIR /app

COPY . .

RUN bun run start