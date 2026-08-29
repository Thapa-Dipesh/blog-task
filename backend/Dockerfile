# ---- Stage 1: Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

ENV DATABASE_URL="postgresql://kodex:kodexlocal@postgres:5432/kodex"
COPY prisma ./prisma
RUN npx prisma generate

COPY . .

RUN npm run build

# ---- Stage 2: Runtime ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
COPY --from=builder /app .

USER appuser
EXPOSE 8000
CMD ["npx", "tsx", "src/index.ts"]