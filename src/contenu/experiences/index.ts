import type { IExperience } from '../../interfaces/IExperience'
import { acetelecom } from './acetelecom'
import { truffle } from './truffle'
import { verhoeven } from './verhoeven'

// Ordre antéchronologique : l'expérience la plus récente en tête.
export const experiences: IExperience[] = [acetelecom, verhoeven, truffle]
