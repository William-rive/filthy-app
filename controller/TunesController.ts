import { Tune } from '../models/TuneModel';
import { Tag } from '@/models/TagModel';

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

export const addTune = async (name: string, description: string, code: string, postedBy: string, tags: string[]): Promise<Tune | null> => {
    try {
        const response = await fetch('/api/tunes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, code, postedBy, tags }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to add tune:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Failed to add tune:', error);
        return null;
    }
};

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