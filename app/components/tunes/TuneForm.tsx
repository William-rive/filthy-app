import React from 'react';
import { Tag } from '../../../models/TagModel';
import { MultiSelect } from '../MultiSelect';

interface TuneFormProps {
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (description: string) => void;
    code: string;
    setCode: (code: string) => void;
    postedBy: string;
    setPostedBy: (postedBy: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    availableTags: Tag[];
    handleAddTune: (e: React.FormEvent) => void;
}

const TuneForm: React.FC<TuneFormProps> = ({
    name,
    setName,
    description,
    setDescription,
    code,
    setCode,
    postedBy,
    setPostedBy,
    tags,
    setTags,
    availableTags,
    handleAddTune,
}) => {
    return (
        <form onSubmit={handleAddTune} className="mb-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tune name"
                className="px-4 py-2 border rounded w-full mb-2"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="px-4 py-2 border rounded w-full mb-2"
            />
            <input
                type="text"
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
            <MultiSelect
                options={availableTags}
                selectedOptions={tags}
                onChange={setTags}
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full">Add Tune</button>
        </form>
    );
};

export default TuneForm;