import React, { useState } from 'react';

interface EventFormProps {
  onAddEvent: (title: string, description: string, date: string, location: string) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent(title, description, date, location);
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 mb-2 ml-5 flex flex-col">
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
  );
};

export default EventForm;