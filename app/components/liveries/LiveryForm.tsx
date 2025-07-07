import React from 'react';
import { Tag } from '../../../models/TagModel';

interface LiveryFormProps {
    name: string;
    setName: (v: string) => void;
    description: string;
    setDescription: (v: string) => void;
    image: string;
    setImage: (v: string) => void;
    postedBy: string;
    setPostedBy: (v: string) => void;
    tags: string[];
    setTags: (v: string[]) => void;
    availableTags: Tag[];
    handleAddLivery: (e: React.FormEvent) => void;
}

const LiveryForm: React.FC<LiveryFormProps> = ({
    name, setName,
    description, setDescription,
    image, setImage,
    postedBy, setPostedBy,
    tags, setTags,
    availableTags,
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
        <input
            type="text"
            placeholder="Posted by"
            value={postedBy}
            onChange={e => setPostedBy(e.target.value)}
            className="block mb-2 p-2 border rounded w-full"
        />
        <div className="mb-2">
            <label className="block mb-1">Tags:</label>
            <select
                multiple
                value={tags}
                onChange={e => setTags(Array.from(e.target.selectedOptions, option => option.value))}
                className="block p-2 border rounded w-full"
            >
                {availableTags.map(tag => (
                    <option key={tag.id} value={tag.name}>{tag.name}</option>
                ))}
            </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter la livery</button>
    </form>
);

export default LiveryForm;