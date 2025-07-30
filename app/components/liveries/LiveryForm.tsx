import React from 'react';


interface LiveryFormProps {
    name: string;
    setName: (v: string) => void;
    description: string;
    setDescription: (v: string) => void;
    image: string;
    setImage: (v: string) => void;
    handleAddLivery: (e: React.FormEvent) => void;
}

const LiveryForm: React.FC<LiveryFormProps> = ({
    name, setName,
    description, setDescription,
    image, setImage,
    handleAddLivery
}) => (
    <form onSubmit={handleAddLivery} className="mb-6 p-4 border rounded bg-gray-50">
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="block mb-2 p-2 border rounded w-full"
            required
        />
        <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="block mb-2 p-2 border rounded w-full"
            required
        />
        <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={e => setImage(e.target.value)}
            className="block mb-2 p-2 border rounded w-full"
        />
        {/* Champ postedBy supprimé */}
        {/* Champ tags supprimé */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter la livery</button>
    </form>
);

export default LiveryForm;