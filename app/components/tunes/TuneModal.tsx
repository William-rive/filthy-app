import React from 'react';
import { Tune } from '../../../models/TuneModel';
import Modal from '../Modal';

interface TuneModalProps {
    isOpen: boolean;
    onClose: () => void;
    tune: Tune | null;
}

const TuneModal: React.FC<TuneModalProps> = ({ isOpen, onClose, tune }) => {
    if (!tune) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text-2xl font-bold mb-4">{tune.name}</h2>
                <p>{tune.description}</p>
                <p>Code: {tune.code}</p>
                <p>Posted by: {tune.postedBy}</p>
                <p>Created at: {new Date(tune.createdAt).toLocaleDateString()}</p>
                <p>Last updated: {new Date(tune.updatedAt).toLocaleDateString()}</p>
                <div className="flex flex-wrap">
                    {tune.tags.map((tuneTag, index) => (
                        <span key={index} className="m-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                            {tuneTag.tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default TuneModal;