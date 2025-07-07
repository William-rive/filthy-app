import { Livery } from '../models/LiveryModel';
import { Tag } from '../models/TagModel';

// Récupérer toutes les liveries
export const fetchLiveries = async (): Promise<Livery[]> => {
    const res = await fetch('/api/liveries');
    if (!res.ok) throw new Error('Erreur lors du chargement des liveries');
    return await res.json();
};

// Ajouter une livery
export const addLivery = async (
    name: string,
    description: string,
    image: string,
    postedBy: string,
    tagsList: string[]
): Promise<Livery | null> => {
    const res = await fetch('/api/liveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, image, postedBy, tags: tagsList }),
    });
    if (!res.ok) return null;
    return await res.json();
};

// Mettre à jour une livery
export const updateLivery = async (
    id: string,
    name: string,
    description: string,
    image: string,
    postedBy: string,
    tagsList: string[]
): Promise<Livery | null> => {
    const res = await fetch(`/api/liveries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, image, postedBy, tags: tagsList }),
    });
    if (!res.ok) return null;
    return await res.json();
};

// Supprimer une livery
export const deleteLivery = async (id: string): Promise<boolean> => {
    const res = await fetch(`/api/liveries/${id}`, { method: 'DELETE' });
    return res.ok;
};

// Récupérer les tags disponibles
export const fetchTags = async (): Promise<Tag[]> => {
    const res = await fetch('/api/tags');
    if (!res.ok) throw new Error('Erreur lors du chargement des tags');
    return await res.json();
};