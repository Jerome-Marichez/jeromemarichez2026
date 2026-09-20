import styles from './mug.module.css';

interface IMugProps {
  /** Libelle lu par la synthese vocale. Laisser vide pour un mug decoratif. */
  readonly description?: string;
}

/**
 * Le mug, signature du site et seul mouvement permanent de la page.
 *
 * Entierement dessine en SVG et anime en CSS : aucun JavaScript, aucune image,
 * aucune video. Le portfolio d'origine chargeait un PNG et un MP4 de plusieurs
 * centaines de kilo-octets pour ce meme effet ; ici la vapeur coute zero octet
 * de script et reste nette a toutes les tailles.
 *
 * La vapeur est un mouvement a vitesse constante, donc animee en `linear`.
 * La rotation du cafe est un survol, donc en `ease`. Les deux s'arretent sur
 * `prefers-reduced-motion` et sur le bouton de mise en pause (WCAG 2.2.2).
 */
export function Mug({ description }: IMugProps) {
  const decoratif = description === undefined;

  return (
    <div className={styles.scene}>
      <svg
        className={styles.mug}
        viewBox="0 0 200 210"
        role={decoratif ? 'presentation' : 'img'}
        aria-hidden={decoratif ? true : undefined}
        aria-label={decoratif ? undefined : description}
      >
        <defs>
          {/* Le cafe vu de dessus : sombre au bord, chaud au centre. */}
          <radialGradient id="surfaceCafe" cx="42%" cy="38%" r="72%">
            <stop offset="0%" stopColor="#a8622f" />
            <stop offset="55%" stopColor="#6b3a1c" />
            <stop offset="100%" stopColor="#331a0d" />
          </radialGradient>

          {/* La ceramique prend la lampe sur sa gauche. */}
          <linearGradient id="ceramique" x1="0%" y1="0%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#efe8e4" />
            <stop offset="46%" stopColor="#cfc5c0" />
            <stop offset="100%" stopColor="#8e837e" />
          </linearGradient>

          {/* La vapeur s'efface vers le haut, elle ne se coupe pas net. */}
          <linearGradient id="vapeur" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f7f2f2" stopOpacity="0.44" />
            <stop offset="60%" stopColor="#f7f2f2" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#f7f2f2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ---- La vapeur, trois volutes decalees ---- */}
        <g className={styles.vapeurs} fill="none" stroke="url(#vapeur)" strokeWidth="5" strokeLinecap="round">
          <path className={styles.volute1} d="M78 96 C 68 76, 90 64, 80 44 C 72 28, 86 20, 82 6" />
          <path className={styles.volute2} d="M100 92 C 90 70, 112 58, 102 36 C 94 20, 108 12, 104 -2" />
          <path className={styles.volute3} d="M122 96 C 112 76, 134 64, 124 44 C 116 28, 130 20, 126 6" />
        </g>

        {/* ---- L'anse, derriere le corps ---- */}
        <path
          d="M150 132 C 178 132, 178 168, 150 168"
          fill="none"
          stroke="url(#ceramique)"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* ---- Le corps du mug ---- */}
        <path
          className={styles.corps}
          d="M48 112 L54 190 C 55 199, 62 205, 71 205 L129 205 C 138 205, 145 199, 146 190 L152 112 Z"
          fill="url(#ceramique)"
        />

        {/* ---- L'ouverture, puis le cafe qui tourne dedans ---- */}
        <ellipse cx="100" cy="112" rx="52" ry="15" fill="#6f645f" />
        <ellipse cx="100" cy="112" rx="47" ry="12.5" fill="url(#surfaceCafe)" />

        <g className={styles.tourbillon}>
          {/* La crema : deux arcs clairs qui tournent lentement sur la surface. */}
          <ellipse
            cx="100"
            cy="112"
            rx="30"
            ry="7"
            fill="none"
            stroke="#c98a53"
            strokeOpacity="0.5"
            strokeWidth="2.2"
            strokeDasharray="26 40"
          />
          <ellipse
            cx="100"
            cy="112"
            rx="17"
            ry="4"
            fill="none"
            stroke="#e0a875"
            strokeOpacity="0.4"
            strokeWidth="1.8"
            strokeDasharray="14 24"
          />
        </g>

        {/* ---- Le reflet de la lampe sur la levre du mug ---- */}
        <path
          d="M62 106 C 74 99, 90 96, 100 96"
          fill="none"
          stroke="#fffaf6"
          strokeOpacity="0.55"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
