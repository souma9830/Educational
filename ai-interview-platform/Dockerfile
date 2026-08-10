# =========================================================
# Multi-Stage Dockerfile for AI Interview Platform
# =========================================================

# ---------------------------------------------------------
# Stage 1: Base Node.js Environment
# ---------------------------------------------------------
FROM node:20-alpine AS base
WORKDIR /app

# ---------------------------------------------------------
# Stage 2: Server Dependencies (Production)
# ---------------------------------------------------------
FROM base AS server-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# ---------------------------------------------------------
# Stage 3: Client Build Stage
# ---------------------------------------------------------
FROM base AS client-builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# ---------------------------------------------------------
# Stage 4: Backend Service Target (Development & Containerized API)
# ---------------------------------------------------------
FROM base AS backend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5000
ENV PORT=5000
ENV NODE_ENV=development
CMD ["npm", "run", "server"]

# ---------------------------------------------------------
# Stage 5: Frontend Service Target (Development Vite Client)
# ---------------------------------------------------------
FROM base AS frontend
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ---------------------------------------------------------
# Stage 6: Production Single-Container Stage
# ---------------------------------------------------------
FROM base AS production
WORKDIR /app
COPY --from=server-deps /app/node_modules ./node_modules
COPY package.json ./
COPY server ./server
COPY scripts ./scripts
COPY database ./database
COPY --from=client-builder /app/client/dist ./client/dist
EXPOSE 5000
ENV NODE_ENV=production
ENV PORT=5000
CMD ["node", "server/server.js"]
