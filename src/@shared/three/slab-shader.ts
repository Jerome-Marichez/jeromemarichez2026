// slab-shader.ts — jeromemarichez-fr
// Le matériau des dalles de verre. Un seul programme, partagé par les trois.
//
// Volontairement PAS de `MeshPhysicalMaterial` avec `transmission` : la transmission
// impose une passe de rendu et une cible de rendu par objet transparent. Pour trois
// dalles qui n'ont besoin que d'une arête allumée, le coût serait sans rapport avec
// le résultat. Un Fresnel dans un shader non éclairé donne la même lecture pour
// zéro lumière, zéro ombre et zéro texture.

export const SLAB_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormalView = normalize(normalMatrix * normal);
    vec4 positionView = modelViewMatrix * vec4(position, 1.0);
    vPositionView = positionView.xyz;
    gl_Position = projectionMatrix * positionView;
  }
`

export const SLAB_FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  uniform vec3 uEdgeColor;
  uniform vec3 uCoreColor;
  uniform float uTime;
  uniform float uIndex;

  varying vec3 vNormalView;
  varying vec3 vPositionView;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormalView);
    vec3 view = normalize(-vPositionView);

    // Fresnel : le centre reste presque vide, l'arête s'allume. C'est le biseau de la
    // géométrie qui rend l'effet lisible — sans lui, la dalle serait un simple voile.
    float fresnel = pow(1.0 - clamp(dot(normal, view), 0.0, 1.0), 3.0);

    // Bande spéculaire unique, qui glisse lentement le long de la dalle. Décalée par
    // dalle pour que les trois ne clignotent pas ensemble.
    float bandeCentre = fract(uTime * 0.06 + uIndex * 0.31);
    float bande = smoothstep(0.06, 0.0, abs(vUv.y - bandeCentre));

    vec3 couleur = mix(uCoreColor, uEdgeColor, fresnel);
    couleur += bande * 0.35;

    float alpha = mix(0.045, 0.55, fresnel) + bande * 0.10;
    gl_FragColor = vec4(couleur, clamp(alpha, 0.0, 0.75));
  }
`

/**
 * Teinte d'arête par dalle : cuivrée, neutre, froide.
 *
 * Les trois pôles sont codés sans être nommés — la scène n'affiche aucun texte et
 * n'est jamais la source d'une information que la page ne donne pas déjà.
 */
export const SLAB_EDGE_COLORS = ['#b4623a', '#9ba3aa', '#7f97a8'] as const

/** Cœur de dalle, presque éteint : c'est l'absence de matière qui fait le verre. */
export const SLAB_CORE_COLOR = '#c9c2b6'
