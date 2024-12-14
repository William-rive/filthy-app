'use client';
import React, { useEffect, useState } from 'react';
import { Event } from '../../models/EventModel';

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events');
                if (response.ok) {
                    const events = await response.json();
                    setEvents(events);
                } else {
                    console.error('Failed to fetch events:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, date, location }),
            });
            if (response.ok) {
                const newEvent = await response.json();
                setEvents([...events, newEvent]);
                setTitle('');
                setDescription('');
                setDate('');
                setLocation('');
            } else {
                console.error('Failed to add event:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to add event:', error);
        }
    };

    const scrollToEvents = () => {
        const eventsSection = document.getElementById('events-section');
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className='bg-slate-800 flex flex-col justify-center'>
            <div>
                <div className="flex justify-center items-center flex-col text-center bg-cover bg-center h-screen"
                    style={{ backgroundImage: 'url(/assets/carrousel.jpg)' }}>
                    <div>
                        <h1 className="text-white text-7xl">Welcome to Filthy App</h1>
                        <button onClick={scrollToEvents} className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>Events</button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center mt-10'>
                <div id="events-section" className="w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                            <p className="text-gray-700 mb-4">{event.description}</p>
                            <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                            <p className="text-gray-500">{event.location}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex mt-10 justify-center">
                <form onSubmit={handleAddEvent} className="mt-10 mb-2 ml-5 flex flex-col">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-2 px-4 py-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-2 px-4 py-2 border rounded"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mb-2 px-4 py-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mb-2 px-4 py-2 border rounded"
                    />
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Event</button>
                </form>
            </div>
        </section>
    );
};

export default HomePage;