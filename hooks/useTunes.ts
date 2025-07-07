import { useState, useEffect, useCallback } from 'react';
import { fetchTunes, addTune, updateTune, deleteTune, fetchTags, fetchTuneById } from '../controller/TunesController';
import { Tag } from '../models/TagModel';
import { Tune } from '../models/TuneModel';

// Custom hook pour gérer les tunes
export const useTunes = () => {
    const [results, setResults] = useState<Tune[]>([]);
    const [filteredResults, setFilteredResults] = useState<Tune[]>([]);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [selectedTune, setSelectedTune] = useState<Tune | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    }, []);
    const filterTunes = useCallback(
        (query: string = "", tags: string[] = [] ) => {
        let filtered = results;
        const safeQuery = typeof query === "string" ? query : "";

        // Filter by query (name or description, case-insensitive)
        if (safeQuery.trim() !== "") {
            const lowerQuery = query.toLowerCase();
            filtered = filtered.filter(
                tune =>
                    tune.name.toLowerCase().includes(lowerQuery) ||
                    tune.description.toLowerCase().includes(lowerQuery)
            );
        }

        if (tags.length > 0) {
            filtered = filtered.filter(tune =>
                tune.tags.some(tuneTag => tags.includes(tuneTag.tag.name))
            );
        }

        setFilteredResults(filtered);
    },
    [results]
);// Ajoute les dépendances nécessaires

    const handleAddTune = async (name: string, description: string, code: string, postedBy: string, tags: string[]) => {
        const newTune = await addTune(name, description, code, postedBy, tags);
        if (newTune) {
            setResults([...results, newTune]);
        }
    };

    const handleUpdateTune = async (id: string, name: string, description: string, code: string, postedBy: string, tags: string[]) => {
        const updatedTune = await updateTune(id, name, description, code, postedBy, tags);
        if (updatedTune) {
            setResults(results.map(tune => (tune.id === id ? updatedTune : tune)));
        }
    };

    const handleDeleteTune = async (id: string) => {
        const success = await deleteTune(id);
        if (success) {
            setResults(results.filter(tune => tune.id !== id));
        }
    };

    const handleSelectTune = async (id: string) => {
        const tune = await fetchTuneById(id);
        if (tune) {
            setSelectedTune(tune);
            setIsModalOpen(true);
        } else {
            console.error('Failed to fetch tune details');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTune(null);
    };

    return {
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
    };
};