import { useState, useEffect } from 'react';
import { fetchEvents, addEvent } from '../controller/HomeController';
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

    return { events, handleAddEvent };
};