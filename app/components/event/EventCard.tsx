import React from 'react';
import { Event } from '../../../models/EventModel';

interface EventCardProps {
  event: Event;
  isAdmin: boolean;
  onDelete: (id: number) => void;
  onEdit: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isAdmin, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-500">{event.location}</p>
      {isAdmin && (
        <div className="flex gap-2 mt-4">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
            onClick={() => onEdit(event)}
          >
            Modifier
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
            onClick={() => onDelete(event.id)}
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;