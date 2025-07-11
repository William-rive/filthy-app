import { Event } from '../models/EventModel';

// Récupération des événements
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

// Ajout d'un événement
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

// Suppression d'un événement
export const deleteEvent = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (error) {
        console.error('Failed to delete event:', error);
        return false;
    }
};

// Mise à jour d'un événement
export const updateEvent = async (event: Event): Promise<Event | null> => {
    try {
        const response = await fetch(`/api/events/${event.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: event.title,
                description: event.description,
                date: event.date,
                location: event.location,
            }),
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to update event:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Failed to update event:', error);
        return null;
    }
};