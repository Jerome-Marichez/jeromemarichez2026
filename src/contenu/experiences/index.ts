import type { IExperience } from "../../interfaces/IExperience";
import { acetelecom } from "./acetelecom";
import { verhoeven } from "./verhoeven";
import { truffle } from "./truffle";

// Ordre antéchronologique : l'expérience la plus récente en tête.
export const experiences: IExperience[] = [acetelecom, verhoeven, truffle];
