import React from 'react';
import { Tag } from '../../models/TagModel';
import { MultiSelect } from './MultiSelect';

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    availableTags: Tag[];
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, tags, setTags, availableTags }) => {
    return (
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
    );
};

export default SearchBar;