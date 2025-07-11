'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import LiveryForm from '../components/liveries/LiveryForm';
import LiveryList from '../components/liveries/LiveryList';
import LiveryModal from '../components/liveries/LiveryModal';
import { useLiveries } from '../../hooks/useLiveries';
import { useSession } from "next-auth/react";

const LiveriesPage: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [query, setQuery] = useState("");

    const {
        filteredResults,
        availableTags,
        selectedLivery,
        isModalOpen,
        filterLiveries,
        handleAddLivery,
        handleUpdateLivery,
        handleDeleteLivery,
        handleSelectLivery,
        handleCloseModal,
    } = useLiveries();

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;

    useEffect(() => {
        filterLiveries(query, tags);
    }, [query, tags, filterLiveries]);

    // Handler pour ajouter une livery
    const handleAddLiveryWrapper = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleAddLivery(name, description, image, postedBy, tags);
        setName('');
        setDescription('');
        setImage('');
        setPostedBy('');
        setTags([]);
    };

    return (
        <div className='pt-24 bg-white'>
            <h1 className="text-3xl font-bold mb-4 flex justify-center m-4">Welcome to the Liveries Page</h1>
            <SearchBar
                query={query}
                setQuery={setQuery}
                tags={tags}
                setTags={setTags}
                availableTags={availableTags}
            />
            {isAuthenticated && (
                <LiveryForm
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                    image={image}
                    setImage={setImage}
                    postedBy={postedBy}
                    setPostedBy={setPostedBy}
                    tags={tags}
                    setTags={setTags}
                    availableTags={availableTags}
                    handleAddLivery={handleAddLiveryWrapper}
                />
            )}
            {!isAuthenticated && (
                <div className="text-center text-gray-500 my-4">Connectez-vous pour ajouter une livery.</div>
            )}
            <LiveryList liveries={filteredResults} onSelect={handleSelectLivery} />
            <LiveryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                livery={selectedLivery}
                onUpdateLivery={handleUpdateLivery}
                onDeleteLivery={handleDeleteLivery}
            />
        </div>
    );
};

export default LiveriesPage;