import React from 'react';
import { Tune } from '../../../models/TuneModel';

interface TuneCardProps {
    tune: Tune;
    onSelect: (id: string) => void;
}

const TuneCard: React.FC<TuneCardProps> = ({ tune, onSelect }) => {
    return (
        <div className="p-4 border rounded shadow-lg cursor-pointer" onClick={() => onSelect(tune.id)}>
            <div className="flex-1">
                <h2 className="text-xl font-bold">{tune.name}</h2>
                <p>{tune.description}</p>
                <p>Last updated: {new Date(tune.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-wrap mt-2">
                {tune.tags.map((tuneTag, index) => (
                    <span key={index} className="m-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                        {tuneTag.tag.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TuneCard;