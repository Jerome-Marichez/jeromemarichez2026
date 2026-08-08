import { PanneauAction } from '@/@shared/components/PanneauAction'
import type { IOffrePage } from '@/interfaces/offre-page'

interface IContactProps {
  contenu: IOffrePage['contact']
}

/**
 * Appel à contact fermant une page d'offre.
 *
 * La composition du panneau vit désormais dans `@shared/components/PanneauAction/` : la
 * page parcours ferme sur le même bloc, et les mesures de contraste qui interdisent le
 * filet et le lien secondaire n'ont pas à être redécouvertes une seconde fois. Cette
 * section garde son existence propre parce qu'elle sait ce qu'une page d'offre appelle
 * « contact » — son ancre et son contenu — ce que le composant partagé ignore.
 */
export function Contact({ contenu }: IContactProps) {
  return (
    <PanneauAction action={contenu.action} id="contact" lead={contenu.lead} titre={contenu.titre} />
  )
}
