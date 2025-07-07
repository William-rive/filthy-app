import React, { useState, useEffect } from 'react';
import { Livery } from '../../../models/LiveryModel';

interface LiveryModalProps {
    isOpen: boolean;
    onClose: () => void;
    livery: Livery | null;
    onUpdateLivery: (id: string, name: string, description: string, image: string, postedBy: string, tags: string[]) => void;
    onDeleteLivery: (id: string) => void;
}

const LiveryModal: React.FC<LiveryModalProps> = ({
    isOpen,
    onClose,
    livery,
    onUpdateLivery,
    onDeleteLivery,
}) => {
    const [name, setName] = useState(livery?.name || '');
    const [description, setDescription] = useState(livery?.description || '');
    const [image, setImage] = useState(livery?.image || '');
    const [postedBy, setPostedBy] = useState(livery?.postedBy || '');
    const [tags, setTags] = useState<string[]>(livery?.tags.map(tag => tag.tag.name) || []);

    useEffect(() => {
        if (livery) {
            setName(livery.name);
            setDescription(livery.description);
            setImage(livery.image);
            setPostedBy(livery.postedBy);
            setTags(livery.tags.map(tag => tag.tag.name));
        }
    }, [livery]);

    const handleUpdate = () => {
        if (livery) {
            onUpdateLivery(livery.id, name, description, image, postedBy, tags);
            onClose();
        }
    };

    const handleDelete = () => {
        if (livery) {
            onDeleteLivery(livery.id);
            onClose();
        }
    };

    if (!livery) return null;

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-4">Edit Livery</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Livery name"
                        className="px-4 py-2 border rounded w-full mb-2"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="px-4 py-2 border rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Image URL"
                        className="px-4 py-2 border rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        value={postedBy}
                        onChange={(e) => setPostedBy(e.target.value)}
                        placeholder="Posted by"
                        className="px-4 py-2 border rounded w-full mb-2"
                    />
                    {/* Ajoute ici un champ pour éditer les tags si besoin */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default LiveryModal;