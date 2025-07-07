import React from 'react';
import { Livery } from '../../../models/LiveryModel';
import LiveryCard from './LiveryCard';

interface LiveryListProps {
    liveries: Livery[];
    onSelect: (id: string) => void;
}

const LiveryList: React.FC<LiveryListProps> = ({ liveries, onSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveries.map((livery) => (
                <LiveryCard key={livery.id} livery={livery} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default LiveryList;