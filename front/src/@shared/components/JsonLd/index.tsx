import type { JsonLdGraph } from '../../interfaces/types'

interface IJsonLdProps {
  /** Graphe schema.org à injecter. Construit par `@shared/seo/structured-data.ts`. */
  data: JsonLdGraph
}

/**
 * Sérialise le graphe pour un `<script>`.
 *
 * Le seul caractère capable de refermer prématurément la balise est `<` (dans `</script>`).
 * Il est donc échappé en `<` : la valeur reste du JSON strictement valide — un
 * `JSON.parse` sur le contenu servi la relit à l'identique — et aucune chaîne du contenu
 * ne peut sortir du script.
 */
function serialize(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/**
 * Injecte des données structurées JSON-LD.
 *
 * `dangerouslySetInnerHTML` est ici obligatoire et non un raccourci : React échappe les
 * enfants textuels en entités HTML (`&quot;`), ce qui produirait un JSON illisible par
 * les moteurs. L'entrée n'est jamais fournie par un utilisateur — elle est construite à
 * partir du contenu typé du dépôt — et elle est échappée ci-dessus.
 */
export function JsonLd({ data }: IJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: seule façon d'émettre du JSON-LD non échappé en entités HTML ; contenu interne au dépôt et échappé par serialize().
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  )
}
