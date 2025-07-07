import { Tag } from './TagModel';

// Modèle pour les liveries
export interface Livery {
    id: string;
    name: string;
    description: string;
    image: string; // URL ou chemin de l'image de la livrée
    createdAt: Date;
    postedBy: string;
    updatedAt: Date;
    tags: LiveryTag[];
}

// Modèle pour les tags associés aux liveries
export interface LiveryTag {
    liveryId: string;
    tagId: string;
    livery: Livery;
    tag: Tag;
}