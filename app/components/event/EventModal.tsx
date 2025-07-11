import React, { useState, useEffect } from 'react';
import type { Event } from '../../../models/EventModel';
import { toast } from 'react-hot-toast';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      setDate(new Date(event.date).toISOString().slice(0, 10));
      setLocation(event.location);
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave({ ...event, title, description, date: new Date(date), location });
      toast.success('Événement modifié avec succès !');
    } catch (err) {
      toast.error("Erreur lors de la modification de l'événement");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Modifier événement</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-2 p-2 border rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titre"
            required
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            className="w-full mb-2 p-2 border rounded"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Lieu"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Annuler</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
