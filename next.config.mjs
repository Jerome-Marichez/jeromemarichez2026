// next.config.mjs — jeromemarichez-fr
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Génération statique pure : `next build` écrit un site complet dans `out/`, servi
  // par n'importe quel serveur de fichiers (voir Dockerfile et docs/docker.md).
  // Contrainte assumée : plus de route API, plus d'ISR, plus de Server Action — le
  // futur formulaire de contact devra passer par un service tiers ou un back séparé.
  output: 'export',

  // Chaque route sort en `<route>/index.html` plutôt qu'en `<route>.html`. C'est la
  // seule forme qu'un serveur de fichiers résout sans règle de réécriture, donc la
  // seule qui rende l'export portable d'un hébergeur à l'autre. En contrepartie les
  // URL canoniques portent la barre finale — sitemap et `canonical` sont alignés
  // dessus (src/app/sitemap.ts).
  trailingSlash: true,
}

export default nextConfig
