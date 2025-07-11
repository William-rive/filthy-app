import React, { useState, useEffect } from 'react';
import { Tune } from '../../../models/TuneModel';
import Modal from '../Modal';
import { useSession } from 'next-auth/react';

interface TuneModalProps {
    isOpen: boolean;
    onClose: () => void;
    tune: Tune | null;
    onUpdateTune: (id: string, name: string, description: string, code: string, postedBy: string, tags: string[]) => void;
    onDeleteTune: (id: string) => void;
}

const TuneModal: React.FC<TuneModalProps> = ({ isOpen, onClose, tune, onUpdateTune, onDeleteTune }) => {
    const [name, setName] = useState(tune?.name || '');
    const [description, setDescription] = useState(tune?.description || '');
    const [code, setCode] = useState(tune?.code || '');
    const [postedBy, setPostedBy] = useState(tune?.postedBy || '');
    const [tags, setTags] = useState<string[]>(tune?.tags.map(tag => tag.tag.name) || []);
    const { data: session } = useSession();
    const currentUser = session?.user as { role?: string } | undefined;

    useEffect(() => {
        if (tune) {
            setName(tune.name);
            setDescription(tune.description);
            setCode(tune.code);
            setPostedBy(tune.postedBy);
            setTags(tune.tags.map(tag => tag.tag.name));
        }
    }, [tune]);

    const handleUpdate = () => {
        if (tune) {
            onUpdateTune(tune.id, name, description, code, postedBy, tags);
            onClose();
        }
    };

    const handleDelete = () => {
        if (tune) {
            onDeleteTune(tune.id);
            onClose();
        }
    };

    if (!tune) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text-2xl font-bold mb-4">Edit Tune</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tune name"
                    className="px-4 py-2 border rounded w-full mb-2"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="px-4 py-2 border rounded w-full mb-2"
                />
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code"
                    className="px-4 py-2 border rounded w-full mb-2"
                />
                <input
                    type="text"
                    value={postedBy}
                    onChange={(e) => setPostedBy(e.target.value)}
                    placeholder="Posted by"
                    className="px-4 py-2 border rounded w-full mb-2"
                />
                {currentUser?.role === "admin" && (
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
                )}
            </div>
        </Modal>
    );
};

export default TuneModal;