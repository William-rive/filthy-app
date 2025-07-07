import { useState, useEffect, useCallback } from 'react';
import { fetchLiveries, addLivery, updateLivery, deleteLivery, fetchTags } from '../controller/LiveriesController';
import { Tag } from '../models/TagModel';
import { Livery } from '../models/LiveryModel';

export const useLiveries = () => {
    const [results, setResults] = useState<Livery[]>([]);
    const [filteredResults, setFilteredResults] = useState<Livery[]>([]);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [selectedLivery, setSelectedLivery] = useState<Livery | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadLiveries = async () => {
            const liveries = await fetchLiveries();
            setResults(liveries);
        };
        const loadTags = async () => {
            const tags = await fetchTags();
            setAvailableTags(tags);
        };
        loadLiveries();
        loadTags();
    }, []);

    const filterLiveries = useCallback(
        (query: string = "", tags: string[] = []) => {
            let filtered = results;
            const safeQuery = typeof query === "string" ? query : "";
            if (safeQuery.trim() !== "") {
                const lowerQuery = safeQuery.toLowerCase();
                filtered = filtered.filter(
                    livery =>
                        livery.name.toLowerCase().includes(lowerQuery) ||
                        livery.description.toLowerCase().includes(lowerQuery)
                );
            }
            const safeTags = Array.isArray(tags) ? tags : [];
            if (safeTags.length > 0) {
                filtered = filtered.filter(livery =>
                    livery.tags.some(liveryTag => safeTags.includes(liveryTag.tag.name))
                );
            }
            setFilteredResults(filtered);
        },
        [results]
    );

    // Handlers pour ajouter, modifier, supprimer, sélectionner, fermer le modal
    const handleAddLivery = async (
        name: string,
        description: string,
        image: string,
        postedBy: string,
        tags: string[]
    ) => {
        const newLivery = await addLivery(name, description, image, postedBy, tags);
        if (newLivery) {
            setResults(prev => [...prev, newLivery]);
        }
    };

    const handleUpdateLivery = async (
        id: string,
        name: string,
        description: string,
        image: string,
        postedBy: string,
        tags: string[]
    ) => {
        const updatedLivery = await updateLivery(id, name, description, image, postedBy, tags);
        if (updatedLivery) {
            setResults(prev => prev.map(l => (l.id === id ? updatedLivery : l)));
        }
    };

    const handleDeleteLivery = async (id: string) => {
        const success = await deleteLivery(id);
        if (success) {
            setResults(prev => prev.filter(l => l.id !== id));
        }
    };

    const handleSelectLivery = (id: string) => {
        const livery = results.find(l => l.id === id) || null;
        setSelectedLivery(livery);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLivery(null);
    };

    return {
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
    };
};