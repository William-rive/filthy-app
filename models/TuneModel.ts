import { Tag } from './TagModel';

// Modèle pour les tunes
export interface Tune {
    id: string;
    name: string;
    description: string;
    code: string;
    createdAt: Date;
    postedBy: string;
    updatedAt: Date;
    tags: TuneTag[];
}

// Modèle pour les tags associés aux tunes
export interface TuneTag {
    tuneId: string;
    tagId: string;
    tune: Tune;
    tag: Tag;
}
