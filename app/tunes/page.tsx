'use client';
import React, { useState, useEffect } from 'react';
import { fetchTunes, addTune, fetchTags } from '../../controller/TunesController';
import { useDebouncedSearch } from '../../hooks/useDebouncerSearch';
import { Tag } from '../../models/TagModel';
import { MultiSelect } from '../components/MultiSelect';

const TunesPage: React.FC = () => {
    const { query, setQuery, results, setResults } = useDebouncedSearch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [filteredResults, setFilteredResults] = useState(results);

    useEffect(() => {
        const loadTunes = async () => {
            const tunes = await fetchTunes();
            setResults(tunes);
        };

        const loadTags = async () => {
            const tags = await fetchTags();
            setAvailableTags(tags);
        };

        loadTunes();
        loadTags();
    }, [setResults]);

    useEffect(() => {
        if (tags.length === 0) {
            setFilteredResults(results);
        } else {
            const filtered = results.filter(tune =>
                tune.tags.some(tuneTag => tags.includes(tuneTag.tag.name))
            );
            setFilteredResults(filtered);
        }
    }, [tags, results]);

    const handleAddTune = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTune = await addTune(name, description, code, postedBy, tags);
        if (newTune) {
            setResults([...results, newTune]);
            setName('');
            setDescription('');
            setCode('');
            setPostedBy('');
            setTags([]);
        }
    };

    return (
        <div className='pt-24 bg-white'>
            <h1 className="text-2xl font-bold mb-4">Welcome to the Tunes Page</h1>
            <p className="mb-4">This is a simple page for displaying and adding tunes.</p>
            
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for tunes..."
                    className="px-4 py-2 border rounded w-full mb-4"
                />
                <MultiSelect
                    options={availableTags}
                    selectedOptions={tags}
                    onChange={setTags}
                />
            </form>

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

            <ul>
                {filteredResults.map((tune) => (
                    <li key={tune.id} className="mb-4 p-4 border rounded">
                        <h2 className="text-xl font-bold">{tune.name}</h2>
                        <p>{tune.description}</p>
                        <p>Code: {tune.code}</p>
                        <p>Posted by: {tune.postedBy}</p>
                        <p>Tags: {tune.tags.map(tuneTag => tuneTag.tag.name).join(', ')}</p>
                        <p>Created at: {new Date(tune.createdAt).toLocaleDateString()}</p>
                        <p>Last updated: {new Date(tune.updatedAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TunesPage;