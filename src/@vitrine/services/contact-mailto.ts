// contact-mailto.ts — jeromemarichez-fr
// La règle métier du contact : valider une saisie, puis en composer une URL `mailto:`
// qu'un client mail ouvre sans rien perdre en route.
//
// Elle vit dans un service et non dans le composant pour une raison simple : l'encodage
// d'un `mailto:` est la seule partie du formulaire qui puisse être fausse sans que rien
// ne se voie à l'écran. Isolée ici, elle se teste sans monter un arbre React.

import type { IMailtoCompose } from '@/interfaces/IMailtoCompose'
import type { ContactErrors, ContactPreparation } from '@/interfaces/types'
import { type ContactInput, contactSchema } from '@/schemas/contact.schema'

/**
 * Longueur d'URL au-delà de laquelle on refuse d'ouvrir le client mail.
 *
 * La valeur n'est pas une norme : RFC 6068 ne borne rien. C'est le plus petit dénominateur
 * observé côté systèmes — le passage de l'URL au gestionnaire de protocole se fait par une
 * ligne de commande sur Windows, et les troncatures y commencent bien avant les 8 000
 * caractères qu'un navigateur accepterait. 1 800 laisse une marge sous le seuil de 2 000
 * couramment retenu, en-tête `mailto:` et adresse comprises.
 *
 * Le risque qu'on refuse de courir : une troncature est SILENCIEUSE. Le client mail
 * s'ouvre, le message paraît complet, et la dernière phrase manque.
 */
export const LONGUEUR_MAX_URL_MAILTO = 1800

/**
 * Message rendu quand l'URL dépasse la limite alors que la saisie tient dans ses bornes.
 *
 * Il ne parle pas d'encodage : le visiteur n'a pas à savoir qu'une apostrophe courbe pèse
 * neuf caractères une fois pourcent-encodée. Il dit le geste à faire et rappelle la porte
 * de sortie.
 */
export const MESSAGE_URL_TROP_LONGUE =
  'Ce message est trop long pour être transmis à votre client mail. Retirez quelques lignes, ' +
  'ou écrivez-moi directement à l’adresse indiquée à côté du formulaire.'

/**
 * Les cinq caractères que `encodeURIComponent` laisse passer et qu'un `mailto:` regrette.
 *
 * `! ' ( ) *` sont des `sub-delims` au sens de la RFC 3986 : légaux dans une URL, donc
 * épargnés par `encodeURIComponent`, mais recopiés tels quels dans la ligne de commande
 * que certains systèmes construisent pour appeler le client mail. Une apostrophe droite
 * ou une parenthèse y ferment une chaîne au mauvais endroit. Les encoder ne coûte rien et
 * ferme le cas.
 */
const SOUS_DELIMITEURS = /[!'()*]/g

/** Toute forme de fin de ligne. Normalisée en CRLF, la seule que RFC 5322 connaisse. */
const FINS_DE_LIGNE = /\r\n|\r|\n/g

/**
 * Pourcent-encode une valeur destinée à un champ d'en-tête d'un `mailto:`.
 *
 * Ce que `encodeURIComponent` fait déjà, et qu'il ne faut surtout pas défaire : les
 * accents et les apostrophes typographiques passent en UTF-8 pourcent-encodé
 * (`é` → `%C3%A9`, `’` → `%E2%80%99`), l'esperluette devient `%26`, le dièse `%23`, le
 * plus `%2B` — ce dernier compte, un `+` littéral est relu comme une espace par une part
 * des clients. Ce qu'il ne fait pas, et qui est ajouté ici : les cinq `sub-delims`.
 *
 * Les fins de ligne sont normalisées AVANT l'encodage, sans quoi un `\n` seul sortirait
 * en `%0A` là où le corps d'un mail attend `%0D%0A`.
 */
export function encodeMailtoValue(valeur: string): string {
  const normalisee = valeur.replace(FINS_DE_LIGNE, '\r\n')

  return encodeURIComponent(normalisee).replace(
    SOUS_DELIMITEURS,
    (caractere) => `%${caractere.charCodeAt(0).toString(16).toUpperCase()}`,
  )
}

/**
 * Le corps du mail : le message, puis la signature.
 *
 * Rien d'autre n'y est ajouté — ni horodatage, ni mention du site, ni identifiant de
 * campagne. Ce mail est écrit par une personne à une autre, et tout ce qui y ressemblerait
 * à un en-tête de robot le ferait lire comme un mail de robot.
 */
function writeMailBody({ message, nom }: ContactInput): string {
  return `${message}\n\n${nom}`
}

/**
 * Compose l'URL `mailto:` à partir d'une saisie déjà validée.
 *
 * Seules les VALEURS sont encodées. Le `?` qui ouvre les champs et le `&` qui les sépare
 * sont la syntaxe de l'URL : les encoder produirait un objet nommé « subject=... » au lieu
 * de deux champs. C'est l'erreur classique d'un encodage appliqué à l'URL entière.
 */
export function composeContactMailto(destinataire: string, saisie: ContactInput): IMailtoCompose {
  const objet = encodeMailtoValue(saisie.sujet)
  const corps = encodeMailtoValue(writeMailBody(saisie))
  const url = `mailto:${destinataire}?subject=${objet}&body=${corps}`

  return {
    url,
    longueur: url.length,
    depasseLimite: url.length > LONGUEUR_MAX_URL_MAILTO,
  }
}

/** Le premier message d'erreur par champ. Zod en empile plusieurs, l'écran n'en montre qu'un. */
function readFirstErrorPerField(issues: readonly { path: PropertyKey[]; message: string }[]) {
  const erreurs: ContactErrors = {}

  for (const issue of issues) {
    const champ = issue.path[0]
    if (typeof champ !== 'string') continue
    if (champ !== 'nom' && champ !== 'sujet' && champ !== 'message') continue
    if (erreurs[champ]) continue
    erreurs[champ] = issue.message
  }

  return erreurs
}

/**
 * Valide une saisie brute et en tire, soit l'URL à ouvrir, soit les erreurs à afficher.
 *
 * C'est le seul point d'entrée du formulaire : le hook n'appelle ni le schéma ni le
 * composeur, il appelle ceci. Les deux façons d'échouer — une saisie hors bornes, une URL
 * trop longue — ressortent sous la même forme, parce qu'elles demandent au visiteur le
 * même geste.
 */
export function prepareContactMail(
  destinataire: string,
  saisie: Record<string, string>,
): ContactPreparation {
  const resultat = contactSchema.safeParse(saisie)

  if (!resultat.success) {
    return { ok: false, erreurs: readFirstErrorPerField(resultat.error.issues) }
  }

  const mailto = composeContactMailto(destinataire, resultat.data)

  if (mailto.depasseLimite) {
    return { ok: false, erreurs: { message: MESSAGE_URL_TROP_LONGUE } }
  }

  return { ok: true, mailto }
}
