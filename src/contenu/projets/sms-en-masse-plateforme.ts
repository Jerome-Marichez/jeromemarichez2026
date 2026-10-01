import type { IProjet } from '../../interfaces/IProjet'

export const smsEnMassePlateforme: IProjet = {
  titre: 'Sms En Masse, plateforme SaaS BtoB de zéro à la production',
  entreprise: 'Acetelecom',
  marque: 'smsEnMasse',
  sousTitre: 'Sms En Masse · lead tech, architecture, développement et run',
  contexte:
    "L'offre était revendue en marque blanche. La plateforme appartenait à un tiers, la marge était " +
    "écrasée et chaque évolution client dépendait de la feuille de route de quelqu'un d'autre.",
  enjeu:
    'Reprendre la maîtrise du produit sans perdre un client ni interrompre les envois, avec un niveau ' +
    'de conformité RGPD et DORA exigé par les grands comptes.',
  monRole:
    'Architecture et choix technologiques, modélisation des données, design patterns front et back, ' +
    'rendu arbitré page par page entre performance perçue, coût serveur et référencement. API REST ' +
    'publique spécifiée en OpenAPI avec webhooks et serveur MCP. Développement, CI/CD, mise en ' +
    'production et exploitation.',
  resultat:
    'Plateforme en propre et en production. Lighthouse 98/100, RGAA et WCAG, socle RGPD et DORA ' +
    "opposable en appel d'offres, déploiements sans interruption.",
}
