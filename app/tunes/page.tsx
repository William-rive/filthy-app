'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import TuneForm from '../components/tunes/TuneForm';
import TuneList from '../components/tunes/TuneList';
import TuneModal from '../components/tunes/TuneModal';
import { useTunes } from '../../hooks/useTunes';

const TunesPage: React.FC = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [query, setQuery] = useState("");

    const {
        filteredResults,
        availableTags,
        selectedTune,
        isModalOpen,
        filterTunes,
        handleAddTune,
        handleUpdateTune,
        handleDeleteTune,
        handleSelectTune,
        handleCloseModal,
    } = useTunes();

    //Appelle la fonction filterTunes à chaque fois que query ou tags changent
    useEffect(() => {
        filterTunes(query, tags);
    }, [query, tags, filterTunes]);

    const handleAddTuneWrapper = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleAddTune(name, description, code, postedBy, tags);
        setName('');
        setDescription('');
        setCode('');
        setPostedBy('');
        setTags([]);
    };

    return (
        <div className='pt-24 bg-white'>
            <h1 className="text-3xl font-bold mb-4 flex justify-center m-4">Welcome to the Tunes Page</h1>
            
            <SearchBar
                query={query}
                setQuery={setQuery}
                tags={tags}
                setTags={setTags}
                availableTags={availableTags}
            />

            <TuneForm
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                code={code}
                setCode={setCode}
                postedBy={postedBy}
                setPostedBy={setPostedBy}
                tags={tags}
                setTags={setTags}
                availableTags={availableTags}
                handleAddTune={handleAddTuneWrapper}
            />

            <TuneList tunes={filteredResults} onSelect={handleSelectTune} />

            <TuneModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                tune={selectedTune}
                onUpdateTune={handleUpdateTune}
                onDeleteTune={handleDeleteTune}
            />
        </div>
    );
};

export default TunesPage;