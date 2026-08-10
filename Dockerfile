# =========================================================
# Multi-Stage Dockerfile for AI Interview Platform (Root Context)
# =========================================================

FROM node:20-alpine AS base
WORKDIR /app

FROM base AS server-deps
WORKDIR /app
COPY ai-interview-platform/package.json ai-interview-platform/package-lock.json ./
RUN npm ci --only=production

FROM base AS client-builder
WORKDIR /app/client
COPY ai-interview-platform/client/package.json ai-interview-platform/client/package-lock.json ./
RUN npm ci
COPY ai-interview-platform/client/ ./
RUN npm run build

FROM base AS backend
WORKDIR /app
COPY ai-interview-platform/package.json ai-interview-platform/package-lock.json ./
RUN npm ci
COPY ai-interview-platform/ ./
EXPOSE 5000
ENV PORT=5000
ENV NODE_ENV=development
CMD ["npm", "run", "server"]

FROM base AS frontend
WORKDIR /app/client
COPY ai-interview-platform/client/package.json ai-interview-platform/client/package-lock.json ./
RUN npm ci
COPY ai-interview-platform/client/ ./
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS production
WORKDIR /app
COPY --from=server-deps /app/node_modules ./node_modules
COPY ai-interview-platform/package.json ./
COPY ai-interview-platform/server ./server
COPY ai-interview-platform/scripts ./scripts
COPY ai-interview-platform/database ./database
COPY --from=client-builder /app/client/dist ./client/dist
EXPOSE 5000
ENV NODE_ENV=production
ENV PORT=5000
CMD ["node", "server/server.js"]
