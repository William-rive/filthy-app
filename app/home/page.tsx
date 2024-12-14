'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchEvents, addEvent } from '../../controller/HomeController';
import { Event } from '../../models/EventModel';
import EventForm from '../components/event/EventForm';
import EventList from '../components/event/EventList';

const HomePage: React.FC = () => {
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
                <EventList events={events} />
            </div>

            <div className="flex mt-10 justify-center">
                <EventForm onAddEvent={handleAddEvent} />
            </div>

            <div className="flex flex-col md:flex-row items-center mt-10 bg-white p-6">
                <div className="md:w-1/2">
                    <Image src="/assets/filthy.png" alt="filthy inc logo" className="rounded-lg" width={800} height={500} />                </div>
                <div className="md:w-1/2 mt-4 md:mt-0 md:ml-6">
                    <h2 className="text-2xl font-bold mb-2">About us</h2>
                    <p className="text-gray-700 mb-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo modi unde eveniet ut ad odit, a dolores natus
                        nisi provident, veniam corporis et possimus illo voluptatibus maxime molestiae. Reprehenderit, similique.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum culpa amet, voluptas molestiae asperiores
                        illum omnis quis commodi fugit, deleniti, mollitia harum ad aliquam non quam esse libero. Provident, harum?
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center mt-10 bg-slate-800 p-6">
                <h2 className='text-5xl text-white mb-4'>Sponsor</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 w-full">
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 1" className="rounded-lg" width={300} height={200} />
                    </div>
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 2" className="rounded-lg" width={300} height={200} />
                    </div>
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 3" className="rounded-lg" width={300} height={200} />
                    </div>
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 3" className="rounded-lg" width={300} height={200} />
                    </div>
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 3" className="rounded-lg" width={300} height={200} />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HomePage;