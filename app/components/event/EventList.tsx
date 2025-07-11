import React from 'react';
import { Event } from '../../../models/EventModel';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
  isAdmin: boolean;
  onDelete: (id: number) => void;
  onEdit: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, isAdmin, onDelete, onEdit }) => {
  return (
    <div id="events-section" className="w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
      {events.map((event) => (
        <EventCard key={event.id} event={event} isAdmin={isAdmin} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default EventList;