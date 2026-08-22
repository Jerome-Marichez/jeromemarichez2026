// GlassRefraction/index.tsx — jeromemarichez-fr
// La réfraction du verre : un filtre SVG, déclaré une fois pour tout le site.

import styles from './glass-refraction.module.css'

/**
 * Identifiant du filtre. Le CSS le consomme par le jeton `--verre-refraction`
 * (`src/app/verre.css`), jamais en écrivant `url(#…)` dans un module.
 */
export const ID_REFRACTION = 'verre-refraction'

/**
 * Part de chaque bord occupée par la rampe de déplacement.
 *
 * Au-delà de cette part, la carte est neutre et le déplacement nul : **l'effet se lit sur
 * l'arête et disparaît au centre**, ce qui est le seul endroit où un vrai verre courbe ce
 * qu'il y a derrière. Une carte pleine surface — deux dégradés croisés de bord à bord,
 * la recette qui circule — déforme tout le panneau et croise ses deux axes dans les
 * angles : c'est de là que venaient les artefacts en losange du premier essai.
 */
const BANDE = 0.1

/**
 * Amplitude du déplacement, en unités de boîte englobante (`primitiveUnits`).
 *
 * SVG multiplie cette valeur par la demi-diagonale de la boîte : un grand panneau courbe
 * donc plus qu'un petit, comme une lentille plus épaisse. Sur le panneau de référence
 * (1164 × 282 px) cela fait ±17 px au ras du bord.
 */
const ECHELLE = 0.04

/**
 * Élargissement de la région du filtre, en pourcentage de la boîte, sur chaque côté.
 *
 * **Ce n'est pas un réglage de confort, c'est la correction d'un défaut mesuré.** Une
 * région calée sur la boîte du panneau (`x="0%" width="100%"`) rogne l'image de fond
 * AVANT le `blur(22px)` qui suit dans la chaîne : le flou n'a plus de matière à moyenner
 * près des bords et cesse d'effacer la trame. Mesuré sur le fond réel, un filtre
 * **identité** — qui ne fait rien du tout — placé dans une région serrée déplace déjà
 * jusqu'à 7 niveaux sur 255. À 30 % d'élargissement l'écart retombe à 0,000 exactement.
 * 40 % garde de la marge pour les panneaux courts : il faut au moins trois écarts-types
 * de flou, soit 66 px, et 40 % d'un panneau de 300 px en fait 120.
 */
const MARGE = 40

/**
 * La carte de déplacement, en image.
 *
 * `feDisplacementMap` lit le **rouge** pour le déplacement horizontal et le **vert** pour
 * le vertical, 128 valant « ne bouge pas ». Deux dégradés suffisent donc, l'un par axe,
 * composés en `screen` — les deux canaux sont disjoints, `screen` vaut alors une somme.
 *
 * Les quatre arrêts par dégradé dessinent la rampe : extrême au ras du bord, neutre à
 * `BANDE`, neutre encore à `1 - BANDE`, extrême à l'autre bord.
 *
 * **Le sens compte.** Au bord gauche le rouge vaut 255, donc le déplacement est positif,
 * donc le pixel est allé chercher sa couleur *vers l'intérieur*. C'est vrai des quatre
 * bords : la carte échantillonne toujours vers le dedans. Aucun pixel ne va donc chercher
 * ce qui se trouve hors de la région du filtre — et c'est cette propriété, et non un
 * réglage prudent de l'amplitude, qui garantit l'absence de frange sur le pourtour.
 */
const CARTE = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">',
  '<defs>',
  '<linearGradient id="x" x1="0" y1="0" x2="1" y2="0">',
  '<stop offset="0" stop-color="rgb(255,0,0)"/>',
  `<stop offset="${BANDE}" stop-color="rgb(128,0,0)"/>`,
  `<stop offset="${1 - BANDE}" stop-color="rgb(128,0,0)"/>`,
  '<stop offset="1" stop-color="rgb(0,0,0)"/>',
  '</linearGradient>',
  '<linearGradient id="y" x1="0" y1="0" x2="0" y2="1">',
  '<stop offset="0" stop-color="rgb(0,255,0)"/>',
  `<stop offset="${BANDE}" stop-color="rgb(0,128,0)"/>`,
  `<stop offset="${1 - BANDE}" stop-color="rgb(0,128,0)"/>`,
  '<stop offset="1" stop-color="rgb(0,0,0)"/>',
  '</linearGradient>',
  '</defs>',
  '<rect width="100" height="100" fill="url(#x)"/>',
  '<rect width="100" height="100" fill="url(#y)" style="mix-blend-mode:screen"/>',
  '</svg>',
].join('')

const CARTE_URI = `data:image/svg+xml,${encodeURIComponent(CARTE)}`

/**
 * Le filtre de réfraction, posé une fois par la mise en page racine.
 *
 * ## Ce qu'il fait, et ce qu'il ne fait pas
 *
 * `backdrop-filter: url(…) blur(…) saturate(…)` : le déplacement s'applique à l'image de
 * fond **avant** le flou. L'ordre inverse ne produit rien du tout — mesuré : 1 niveau sur
 * 255 — parce qu'une surface déjà floutée est uniforme, et qu'on ne courbe pas ce qui
 * n'a plus de dessin.
 *
 * `url()` dans `backdrop-filter` n'est **rendu** que par Blink, et c'est le seul moteur à
 * qui le module `glass-surface.module.css` le sert : il garde la réfraction derrière un
 * test de moteur explicite, et derrière un seuil de 1024px. Les raisons des deux — dont
 * un défaut mesuré de la minification, qui interdit de s'en remettre à l'ordre des
 * déclarations — sont écrites en toutes lettres dans ce module, au-dessus de la règle.
 *
 * Ce qu'il faut en retenir ici : **le flou et la saturation ne dépendent jamais de ce
 * fichier.** Safari, Firefox et tous les téléphones gardent exactement le verre que le
 * site leur livre aujourd'hui ; la réfraction n'est qu'une couche en plus, là où elle
 * est réellement rendue.
 *
 * ## Ce que cela donne sur CE fond, et pourquoi c'est dit ici
 *
 * Le fond du site est un lavis quasi uniforme et une trame à 5,5 % d'alpha. Il n'y a
 * presque rien à courber, et cela se mesure : entre le panneau flouté seul et le même
 * panneau réfractant, l'écart maximal est de **2 niveaux sur 255**, sur l'arête. C'est
 * sous le seuil de perception. Le filtre est juste, il ne triche pas, il n'abîme rien —
 * mais ce qu'il déplace ici n'a pas de quoi se voir. Il prendra son sens le jour où un
 * panneau passera sur une image ou sur la scène du seuil. Les chiffres et la méthode sont
 * dans `docs/design.md`.
 *
 * Aucun état, aucun effet, aucun `'use client'` : le filtre est du balisage, rendu au
 * serveur, présent au premier octet de HTML.
 */
export function GlassRefraction() {
  return (
    <svg aria-hidden="true" className={styles.defs} focusable="false">
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          height={`${100 + 2 * MARGE}%`}
          id={ID_REFRACTION}
          primitiveUnits="objectBoundingBox"
          width={`${100 + 2 * MARGE}%`}
          x={`-${MARGE}%`}
          y={`-${MARGE}%`}
        >
          {/* La sous-région cale la carte sur la BOÎTE du panneau, pas sur la région
              élargie du filtre. Sans elle, la rampe se poserait à 40 % hors du panneau et
              la carte serait neutre partout où on la regarde — le déplacement serait nul
              sans que rien ne le signale. */}
          <feImage
            height="1"
            href={CARTE_URI}
            preserveAspectRatio="none"
            result="carte"
            width="1"
            x="0"
            y="0"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="carte"
            scale={ECHELLE}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
