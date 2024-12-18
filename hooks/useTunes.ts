import { useState, useEffect } from 'react';
import { fetchTunes, fetchTags, addTune, fetchTuneById } from '../controller/TunesController';
import { Tag } from '../models/TagModel';
import { Tune } from '../models/TuneModel';

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

    const filterTunes = (tags: string[]) => {
        if (tags.length === 0) {
            setFilteredResults(results);
        } else {
            const filtered = results.filter(tune =>
                tune.tags.some(tuneTag => tags.includes(tuneTag.tag.name))
            );
            setFilteredResults(filtered);
        }
    };

    const handleAddTune = async (name: string, description: string, code: string, postedBy: string, tags: string[]) => {
        const newTune = await addTune(name, description, code, postedBy, tags);
        if (newTune) {
            setResults([...results, newTune]);
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
        results,
        filteredResults,
        availableTags,
        selectedTune,
        isModalOpen,
        filterTunes,
        handleAddTune,
        handleSelectTune,
        handleCloseModal,
    };
};