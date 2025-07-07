import React from 'react';
import Image from 'next/image';
import { Livery } from '../../../models/LiveryModel';

interface LiveryCardProps {
    livery: Livery;
    onSelect: (id: string) => void;
}

const LiveryCard: React.FC<LiveryCardProps> = ({ livery, onSelect }) => {
    const tags = Array.isArray(livery.tags) ? livery.tags : [];

    return (
        <div className="p-4 border rounded shadow-lg cursor-pointer" onClick={() => onSelect(livery.id)}>
            <div className="flex-1">
                <h2 className="text-xl font-bold">{livery.name}</h2>
                {livery.image && (
                    <div className="my-2 w-full h-40 relative rounded overflow-hidden">
                        <Image
                            src={livery.image}
                            alt={livery.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded"
                            priority
                        />
                    </div>
                )}
                <p>Last updated: {new Date(livery.updatedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-wrap mt-2">
                {tags.length > 0 ? (
                    tags.map((liveryTag, index) => (
                        <span key={index} className="m-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                            {liveryTag.tag.name}
                        </span>
                    ))
                ) : (
                    <span>No tags available</span>
                )}
            </div>
        </div>
    );
};

export default LiveryCard;