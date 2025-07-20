import React from 'react';
import { Tune } from '../../../models/TuneModel';

interface TuneCardProps {
    tune: Tune;
    onSelect: (id: string) => void;
}

const TuneCard: React.FC<TuneCardProps> = ({ tune, onSelect }) => {

    const tags = Array.isArray(tune.tags) ? tune.tags : [];

    return (
        <div className="p-4 border rounded shadow-lg cursor-pointer" onClick={() => onSelect(tune.id)}>
            <div className="flex-1">
                <h2 className="text-xl font-bold">{tune.name}</h2>
                <p>{tune.description}</p>
                <p>Last updated: {new Date(tune.updatedAt).toLocaleDateString()}</p>
                {/* Affiche le nom de l'utilisateur qui a posté le tune */}
                <p className="mt-2 text-sm text-gray-600">
                    Posté par :
                    <a
                        href={`/profile/${encodeURIComponent(tune.postedBy)}`}
                        className="text-blue-600 hover:underline ml-1"
                        onClick={e => { e.stopPropagation(); }}
                    >
                        {tune.postedBy}
                    </a>
                </p>
            </div>
            <div className="flex flex-wrap mt-2">
            {tags.length > 0 ? (
                    tags.map((tuneTag, index) => (
                        <span key={index} className="m-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                            {tuneTag.tag.name}
                        </span>
                    ))
                ) : (
                    <span>No tags available</span>
                )}
            </div>
        </div>
    );
};

export default TuneCard;