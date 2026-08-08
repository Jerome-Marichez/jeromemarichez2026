# Dockerfile — jeromemarichez2026
# Image multi-stage : build complet puis runtime minimal (règle : docs/docker.md).
# Générique front/back : `npm run build` puis `npm run start` (scripts du package.json).

FROM node:24-alpine AS build
WORKDIR /app
# Domaine public du site. NEXT_PUBLIC_* est substituée AU BUILD par Next.js : la fournir
# au démarrage du conteneur serait sans effet, d'où cet argument de build. Absente, le
# front retombe sur son repli de développement (voir .env.example et docs/seo.md).
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
