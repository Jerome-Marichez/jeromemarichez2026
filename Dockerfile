# Dockerfile — jeromemarichez-fr
# Image multi-stage : build Next puis serveur de fichiers minimal (règle : docs/docker.md).
#
# Le site est en `output: 'export'` (voir next.config.mjs) : `next build` écrit un site
# complet dans `out/`, et il n'y a plus rien à exécuter au runtime. `next start` ne
# fonctionne pas sur une sortie exportée — l'image de runtime est donc un nginx qui sert
# des fichiers, pas un Node qui rend des pages.

FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.29-alpine AS runtime
# `trailingSlash: true` fait sortir chaque route en `<route>/index.html`, que la
# directive `index` de nginx résout nativement : aucune règle de réécriture à tenir.
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
