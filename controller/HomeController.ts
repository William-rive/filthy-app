import { Event } from '../models/EventModel';

export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await fetch('/api/events');
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch events:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return [];
    }
};

export const addEvent = async (title: string, description: string, date: string, location: string): Promise<Event | null> => {
    try {
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, date, location }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to add event:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Failed to add event:', error);
        return null;
    }
};