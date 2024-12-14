import React from 'react';
import { Event } from '../../../models/EventModel';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-500">{event.location}</p>
    </div>
  );
};

export default EventCard;