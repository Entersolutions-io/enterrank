# Multi-stage build producing a minimal Cloud Run image.
# Mirrors the pipeline already in use for EnterCRM and EnterLocal.

FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# `npm install`, not `npm ci`.
#
# The lockfile is generated on Windows, where npm resolves optional dependencies for that
# platform only. One of ESLint's transitive optional packages (@napi-rs/wasm-runtime) pulls in
# @emnapi/core on Linux, and that entry never lands in a Windows-generated lockfile — so
# `npm ci`, which demands an exact lockfile match, fails here with "Missing: @emnapi/core".
# `npm install` resolves for the platform it is actually running on while still honouring the
# pinned versions the lockfile does carry. Revisit if the lockfile is ever generated on Linux.
RUN npm install --no-audit --no-fund --ignore-scripts

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
