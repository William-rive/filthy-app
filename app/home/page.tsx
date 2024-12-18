'use client';
import React from 'react';
import AboutSection from '../components/home/AboutSection';
import Header from '../components/home/Header';
import EventsSection from '../components/home/EventSection';
import AddEventSection from '../components/home/AddEventSection';
import SponsorSection from '../components/home/SponsorSection';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { useScroll } from '../../hooks/useScroll';
import { useEvents } from '../../hooks/useEvents';

const HomePage: React.FC = () => {
    const { events, handleAddEvent } = useEvents();
    const showScroll = useScroll();

    return (
        <section className='bg-slate-800 flex flex-col justify-center pt-24'>
            <Header />
            <EventsSection events={events} />
            <AddEventSection onAddEvent={handleAddEvent} />
            <AboutSection />
            <SponsorSection />
            <ScrollToTopButton show={showScroll} />
        </section>
    );
};

export default HomePage;