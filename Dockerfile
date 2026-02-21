# Premiarte Frontend — Dockerfile para Coolify (Next.js, puerto 6000)
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Dependencias
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Build con variables de build-time si las necesitas (opcional)
ARG NEXT_PUBLIC_*
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production stage (standalone)
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Usuario no root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar solo lo necesario del build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 6000
ENV PORT=6000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
