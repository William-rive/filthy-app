import { Tune } from '../models/TuneModel';
import { Tag } from '@/models/TagModel';

// Récupération des tunes
export const fetchTunes = async (): Promise<Tune[]> => {
    try {
        const response = await fetch('/api/tunes');
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch tunes:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch tunes:', error);
        return [];
    }
};

// Ajout d'un tune
export const addTune = async (
    name: string,
    description: string,
    code: string,
    postedBy: string,
    tags: string[]
): Promise<Tune | null> => {
    try {
        const response = await fetch('/api/tunes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, code, postedBy, tags }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to add tune:', errorData.error || response.statusText);
            return null;
        }

        const newTune: Tune = await response.json();
        return newTune;

    } catch (error) {
        console.error('Failed to add tune:', error);
        return null;
    }
};

// Mise à jour d'un tune
export const updateTune = async (
    id: string,
    name: string,
    description: string,
    code: string,
    postedBy: string,
    tags: string[]
) => {
    const response = await fetch(`/api/tunes/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            description,
            code,
            postedBy,
            tags,
        }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.error('Failed to update tune:', response.statusText);
        return null;
    }
};

// Suppression d'un tune
export const deleteTune = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api/tunes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to delete tune:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Failed to delete tune:', error);
        return false;
    }
};

// Récupération des tags
export const fetchTags = async (): Promise<Tag[]> => {
    try {
        const response = await fetch('/api/tags');
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch tags:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch tags:', error);
        return [];
    }
};

// Récupération d'un tune par ID
export const fetchTuneById = async (id: string): Promise<Tune | null> => {
    try {
        const response = await fetch(`/api/tunes/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch tune:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Failed to fetch tune:', error);
        return null;
    }
};

// Recherche de tunes par nom
export const searchTunes = async (query: string): Promise<Tune[]> => {
    try {
        const response = await fetch(`/api/tunes?name=${query}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to search tunes:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Failed to search tunes:', error);
        return [];
    }
};