'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchEvents, addEvent } from '../../controller/HomeController';
import { Event } from '../../models/EventModel';
import EventForm from '../components/event/EventForm';
import EventList from '../components/event/EventList';

const HomePage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            const events = await fetchEvents();
            setEvents(events);
        };

        loadEvents();

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            eventsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className='bg-slate-800 flex flex-col justify-center pt-24'>

            {/** Hero Section */}
            <div>
                <div className="flex justify-center items-center flex-col text-center bg-cover bg-center h-screen"
                    style={{ backgroundImage: 'url(/assets/carrousel.jpg)' }}>
                    <div>
                        <h1 className="text-white text-7xl">Welcome to Filthy App</h1>
                        <button onClick={scrollToEvents} className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>Events</button>
                    </div>
                </div>
            </div>

            {/** Events Section */}
            <div className='flex flex-col justify-center items-center mt-10'>
                <EventList events={events} />
            </div>

            {/** Add Event Section */}
            <div className="flex mt-10 justify-center">
                <EventForm onAddEvent={handleAddEvent} />
            </div>

            {/** About Section */}
            <div className="flex flex-col md:flex-row items-center p-10 bg-white mt-10">
                <div className="md:w-1/2 p-10">
                    <Image src="/assets/filthy.png" alt="filthy inc logo" className="rounded-lg" width={800} height={800} />                </div>
                <div className="md:w-1/2 mt-4 md:mt-0 md:ml-6 p-10">
                    <h2 className="text-5xl font-bold mb-4">About us</h2>
                    <p className="text-gray-700 mb-4">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo modi unde eveniet ut ad odit, a dolores natus
                        nisi provident, veniam corporis et possimus illo voluptatibus maxime molestiae. Reprehenderit, similique.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum culpa amet, voluptas molestiae asperiores
                        illum omnis quis commodi fugit, deleniti, mollitia harum ad aliquam non quam esse libero. Provident, harum?
                    </p>
                </div>
            </div>

            {/** Sponsor Section */}
            <div className="flex flex-col items-center mt-10 bg-slate-800 p-6">
                <h2 className='text-5xl text-white mb-4'>Sponsor</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 w-full">
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 1" className="rounded-lg" width={300} height={200} unoptimized/>
                    </div>
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 2" className="rounded-lg" width={300} height={200} unoptimized/>
                    </div>
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 3" className="rounded-lg" width={300} height={200} unoptimized/>
                    </div>
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 3" className="rounded-lg" width={300} height={200} unoptimized/>
                    </div>
                    <div className="flex justify-center">
                        <Image src="/assets/backgroundfilthy.gif" alt="Image 3" className="rounded-lg" width={300} height={200} unoptimized/>
                    </div>
                </div>
            </div>

            {showScroll && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 py-3 px-5 bg-blue-500 text-white rounded-lg"
                >
                    ↑
                </button>
            )}

        </section>
    );
};

export default HomePage;