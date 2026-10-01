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

  images: {
    // L'optimisation d'images de Next est un service qui tourne au moment de la
    // requête : elle est donc incompatible avec `output: 'export'`, et Next lève
    // une erreur d'exécution dès qu'un `next/image` est rendu sans cette ligne.
    //
    // Ce n'est pas une perte ici. La seule image du site est le mug de la tasse de
    // café, 124 Kio en PNG, servi tel quel. La redimensionner à la volée coûterait
    // un serveur pour économiser quelques dizaines de kilo-octets sur une image
    // déjà petite. `next/image` reste utilisé pour ce qu'il apporte sans serveur :
    // les dimensions connues à la compilation, donc aucun décalage de mise en page
    // au chargement.
    unoptimized: true,
  },
}

export default nextConfig
