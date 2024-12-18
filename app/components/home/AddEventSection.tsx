import React from 'react';
import EventForm from '../event/EventForm';

interface AddEventSectionProps {
    onAddEvent: (title: string, description: string, date: string, location: string) => void;
}

const AddEventSection: React.FC<AddEventSectionProps> = ({ onAddEvent }) => {
    return (
        <div className="flex mt-10 justify-center">
            <EventForm onAddEvent={onAddEvent} />
        </div>
    );
};

export default AddEventSection;