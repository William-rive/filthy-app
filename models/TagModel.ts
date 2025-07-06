import { TuneTag } from './TuneModel';

// Modèle pour les tags associés aux tunes
export interface Tag {
    id: string;
    name: string;
    tunes: TuneTag[];
}