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
import { useSession } from "next-auth/react";
import type { Event as EventModel } from '../../models/EventModel';
import EventModal from '../components/event/EventModal';
import { toast } from 'react-hot-toast';

// Composant pour la page d'accueil
const HomePage: React.FC = () => {
    const { events, handleAddEvent, handleDeleteEvent, handleUpdateEvent } = useEvents();
    const showScroll = useScroll();
    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = (session?.user as { role?: string })?.role === "admin";

    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [eventToEdit, setEventToEdit] = React.useState<EventModel | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = React.useState<number | null>(null);

    const handleEditEvent = (event: EventModel) => {
        setEventToEdit(event);
        setEditModalOpen(true);
    };
    const handleCloseModal = () => {
        setEditModalOpen(false);
        setEventToEdit(null);
    };
    const handleSaveEvent = async (updated: EventModel) => {
        await handleUpdateEvent(updated);
        handleCloseModal();
    };
    const handleDeleteRequest = (id: number) => {
        setDeleteConfirmId(id);
    };
    const handleDeleteConfirm = async () => {
        if (deleteConfirmId !== null) {
            try {
                await handleDeleteEvent(deleteConfirmId);
                toast.success('Événement supprimé avec succès !');
            } catch (err) {
                toast.error("Erreur lors de la suppression de l'événement");
            }
            setDeleteConfirmId(null);
        }
    };
    const handleDeleteCancel = () => {
        setDeleteConfirmId(null);
    };

    return (
        <section className='bg-slate-800 flex flex-col justify-center pt-24'>
            <Header />
            <EventsSection
                events={events}
                isAdmin={isAdmin}
                onDelete={handleDeleteRequest}
                onEdit={handleEditEvent}
            />
            <EventModal
                event={eventToEdit}
                isOpen={editModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveEvent}
            />
            {isAuthenticated && isAdmin && <AddEventSection onAddEvent={handleAddEvent} />}
            {!isAuthenticated && (
                <div className="text-center text-gray-300 my-4">Connectez-vous pour ajouter un événement.</div>
            )}
            <AboutSection />
            <SponsorSection />
            <ScrollToTopButton show={showScroll} />
            {deleteConfirmId !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
                    <p>Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.</p>
                    <div className="flex justify-end gap-2 mt-4">
                      <button className="px-4 py-2 bg-gray-300 rounded" onClick={handleDeleteCancel}>Annuler</button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDeleteConfirm}>Supprimer</button>
                    </div>
                  </div>
                </div>
            )}
        </section>
    );
};

export default HomePage;