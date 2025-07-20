import React from 'react';
import { useSession } from "next-auth/react";
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
    const { data: session } = useSession();
    React.useEffect(() => {
        if (session?.user?.name) {
            setPostedBy(session.user.name);
        }
    }, [session?.user?.name, setPostedBy]);

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
            {/* postedBy est masqué dans l'UI mais transmis lors de la création */}
            <input type="hidden" value={postedBy} readOnly />
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