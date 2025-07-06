import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../utils/debounce';
import { searchTunes } from '../controller/TunesController';
import { Tune } from '../models/TuneModel';

// Hook customisé pour la recherche avec debounce
export const useDebouncedSearch = (initialQuery: string = '', delay: number = 200) => {
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<Tune[]>([]);

    const handleSearch = useCallback(
        async (query: string) => {
            const tunes = await searchTunes(query);
            setResults(tunes);
        },
        []
    );

    const debouncedHandleSearch = useCallback(
        debounce(handleSearch, delay),
        [handleSearch, delay]
    );

    useEffect(() => {
        debouncedHandleSearch(query);
    }, [query, debouncedHandleSearch]);

    return { query, setQuery, results, setResults };
};