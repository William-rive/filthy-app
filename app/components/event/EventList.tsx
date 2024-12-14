import React from 'react';
import { Event } from '../../../models/EventModel';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div id="events-section" className="w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;