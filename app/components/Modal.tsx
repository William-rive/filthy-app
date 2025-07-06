import React, { useRef } from 'react';

// Interface pour les props du composant Modal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// Composant Modal pour afficher un contenu modale
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
            <div ref={modalRef} className="bg-white p-4 rounded shadow-lg w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-4xl">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;