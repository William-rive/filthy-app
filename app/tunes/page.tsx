'use client';
import React, { useState, useEffect } from 'react';
import { fetchTunes, addTune } from '../../controller/TunesController';
import { useDebouncedSearch } from '../../hooks/useDebouncerSearch';

const TunesPage: React.FC = () => {
    const { query, setQuery, results, setResults } = useDebouncedSearch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [postedBy, setPostedBy] = useState('');

    useEffect(() => {
        const loadTunes = async () => {
            const tunes = await fetchTunes();
            setResults(tunes);
        };

        loadTunes();
    }, [setResults]);

    const handleAddTune = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTune = await addTune(name, description, code, postedBy);
        if (newTune) {
            setResults([...results, newTune]);
            setName('');
            setDescription('');
            setCode('');
            setPostedBy('');
        }
    };

    return (
        <div className='pt-24 bg-white'>
            <h1>Welcome to the Tunes Page</h1>
            <p>This is a simple page for displaying and adding tunes.</p>
            
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for tunes..."
                    className="px-4 py-2 border rounded"
                />
            </form>

            <form onSubmit={handleAddTune} className="mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tune name"
                    className="px-4 py-2 border rounded mb-2"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="px-4 py-2 border rounded mb-2"
                />
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Code"
                    className="px-4 py-2 border rounded mb-2"
                />
                <input
                    type="text"
                    value={postedBy}
                    onChange={(e) => setPostedBy(e.target.value)}
                    placeholder="Posted by"
                    className="px-4 py-2 border rounded mb-2"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Tune</button>
            </form>

            <ul>
                {results.map((tune) => (
                    <li key={tune.id}>{tune.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TunesPage;