import React from 'react';
import EventList from '../event/EventList';
import { Event } from '../../../models/EventModel';

interface EventsSectionProps {
    events: Event[];
    isAdmin: boolean;
    onDelete: (id: number) => void;
    onEdit: (event: Event) => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, isAdmin, onDelete, onEdit }) => {
    return (
        <div id="events-section" className='flex flex-col justify-center items-center mt-10'>
            <EventList events={events} isAdmin={isAdmin} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
};

export default EventsSection;