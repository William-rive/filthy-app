import { useState, useEffect } from 'react';
import { fetchEvents, addEvent, deleteEvent, updateEvent } from '../controller/HomeController';
import { Event } from '../models/EventModel';

// Custom hook pour gérer les événements
export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const loadEvents = async () => {
            const events = await fetchEvents();
            setEvents(events);
        };

        loadEvents();
    }, []);

    const handleAddEvent = async (title: string, description: string, date: string, location: string) => {
        const newEvent = await addEvent(title, description, date, location);
        if (newEvent) {
            setEvents([...events, newEvent]);
        }
    };

    const handleDeleteEvent = async (id: number) => {
        const success = await deleteEvent(id);
        if (success) {
            setEvents(events.filter(e => e.id !== id));
        }
    };

    const handleUpdateEvent = async (updated: Event) => {
        const result = await updateEvent(updated);
        if (result) {
            setEvents(events.map(e => (e.id === updated.id ? result : e)));
        }
    };

    return { events, handleAddEvent, handleDeleteEvent, handleUpdateEvent };
};