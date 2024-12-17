import { Tune } from '../models/TuneModel';

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

export const addTune = async (name: string, description: string, code: string, postedBy: string): Promise<Tune | null> => {
    try {
        const response = await fetch('/api/tunes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, code, postedBy }),
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