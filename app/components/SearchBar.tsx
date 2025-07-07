import React from 'react';
import { Tag } from '../../models/TagModel';
import { MultiSelect } from './MultiSelect';

//Interface pour les props du composant SearchBar
interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    availableTags: Tag[];
}

// Composant SearchBar pour la recherche de tunes
const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, tags, setTags, availableTags }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 border rounded w-full mb-4"
            />
            <MultiSelect
                options={availableTags}
                selectedOptions={tags}
                onChange={setTags}
            />
        </form>
    );
};

export default SearchBar;