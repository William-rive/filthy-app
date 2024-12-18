import React from 'react';
import EventList from '../event/EventList';
import { Event } from '../../../models/EventModel';

interface EventsSectionProps {
    events: Event[];
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
    return (
        <div id="events-section" className='flex flex-col justify-center items-center mt-10'>
            <EventList events={events} />
        </div>
    );
};

export default EventsSection;